const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const methodOverride = require("method-override");

//routes
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard')
const adminRoutes = require('./routes/admin')
const apiRoutes = require('./routes/api')


require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/admin', adminRoutes)
app.use('/api', apiRoutes)

 
app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server is running, you better catch it!')
})    