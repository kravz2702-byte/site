import 'dotenv/config'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import * as handlers from './handlers/handlers.js'
import userRoutes from './routes/user.js'

import {fileURLToPath} from 'url'
import { dirname } from 'path'
import verifyToken from './handlers/authJWT.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

try {
    mongoose.connect('mongodb://localhost:27017/course_project', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('Successfully connected to db')
} catch (error){
    console.log(error.message)
}

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(userRoutes)
app.get('/', handlers.main)

app.get('/about', handlers.about)

app.get('/blog', handlers.blog)

app.get('/teachers', handlers.teachers)

app.get('/registration', handlers.registration)

app.get('/course', verifyToken, handlers.course)

app.get('/signIn', handlers.login)

app.get('/logout', handlers.logout)

app.get('/profile/:username', handlers.profile)

app.get('/create_post', handlers.create_post)

app.use(express.static(__dirname + '/public'))

// TODO: 
// 1)replace ckeditor with tinymce
// 2)add to database
// 3)handle and display all courses
// 4)Cosmetic corrects














const port = process.env.PORT || 3000

















app.listen(port, () => console.log(__dirname))