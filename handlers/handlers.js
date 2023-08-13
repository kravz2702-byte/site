import {User, Lesson, Course, Comment} from '../models/models.js'
import { __dirname } from '../config.js'
import path from 'path'
import mongoose from 'mongoose'

export const main = (req, res) => res.render('main')

export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const lesson = async (req, res) => {
    const lesson = await Lesson.findOne({_id:req.query.id}).lean()
    const id = req.query.id
    const title = lesson.title
    const body = lesson.body
    const videoPath = lesson.videoPath
    const comments = await Comment.find({lessonId: req.query.id}).lean()

    res.render('lesson_page', { videoPath:videoPath, title:title, body:body, lesson_id:id, comments:comments})
}

export const courses = async(req, res) => {
    const courses = await Course.find({}).lean()
    res.render('courses', {courses:courses})}

export const login = (req, res) => res.render('login_page')

export const create_lesson = (req, res) => {
    const id = req.params.id
    res.render('create_lesson', {course_id: id})}

export const create_course = (req, res) => res.render('create_course')

export const course_lessons = async (req, res) =>{
    const id = req.params.id
    const course_lessons = await Lesson.find({accordingToCourse:id}).lean()
    console.log(course_lessons)
    const owner = true
    res.render('lessons', {owner:owner, lessons:course_lessons, id:req.params.id})
}

export const upload_course = (req, res) => {
    const allowedTo = req.body.availableFor.split(',')
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        owner: req.cookies.username,
        allowedTo: allowedTo
    })
    course.save()
        .then(course=>console.log(course.title))
        .catch(err=>console.log(err.message))
    res.redirect('/courses')
}

export const upload_data = (req, res) => {
    const courseId = req.params.id
    const lesson = new Lesson({
        title: req.body.title,
        body: req.body.postText,
        videoPath: path.join('uploads', req.file.filename),
        owner: req.cookies.username,
        accordingToCourse: new mongoose.Types.ObjectId(courseId)
    })
    lesson.save()
        .then(post=>console.log(post.title))
        .catch(err=>console.log(err.message))
    res.redirect(`/courses/${courseId}/lessons`)
}

export const save_comment = (req, res) => {
    const lessonId = req.query.id
    const comment = new Comment({
        username: req.cookies.username,
        body: req.body.commentText,
        lessonId: new mongoose.Types.ObjectId(lessonId)
    })
    comment.save()
        .then(comment => res.redirect(`lesson?id=${lessonId}`))
        .catch(err => console.log(err))
}

export const logout = (req, res) => {
    res.cookie('access_token', '')
    res.redirect('/')
}

export const profile = (req, res) => {
    const username = req.params.username
    const user = User.findOne({
        username
    })
    res.render('profile', {layout:'profile'})
}


