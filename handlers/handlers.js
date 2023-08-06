import {User, Post} from '../models/models.js'
import { __dirname } from '../config.js'
import path from 'path'

export const main = (req, res) => res.render('main')

export const about = (req, res) => res.render('about')

export const blog = (req, res) => res.render('blog')

export const teachers = (req, res) => res.render('teachers')

export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const course = (req, res) => res.render('course')

export const login = (req, res) => res.render('login_page')

export const create_post = (req, res) => res.render('create_post')

export const upload_data = (req, res) => {
    console.log(req.body.title)
    console.log(req.body.postText)
    const post = new Post({
        title: req.body.title,
        body: req.body.postText,
        videoPath: path.join('uploads', req.file.filename)
    })
    post.save()
        .then(post=>console.log(post.title))
        .catch(err=>console.log(err.message))
    res.redirect('/')
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

