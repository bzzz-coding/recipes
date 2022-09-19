// const path = require('path') // no longer needed

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const passport = require('passport')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const methodOverride = require('method-override')

// shows requests in the console
const logger = require('morgan')

// connectDB is an async function in config/db.js
const connectDB = require('./config/db')


const exphbs = require('express-handlebars')

const dotenv = require('dotenv')

// Load config * no longer need to require 'path' first
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connect to DB
connectDB()


// Static folder
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))


// Body parser
// app.use(express.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: true })) // combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.json())

// Logging
// app.use(logger('dev'))
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

// Method override
app.use(methodOverride('_method'))
// app.use(
//   methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       // look in urlencoded POST bodies and delete it
//       let method = req.body._method
//       delete req.body._method
//       return method
//     }
//   })
// )



// Handlebars Helpers, using destructuring
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    // don't save if nothing modified
    resave: false,
    // don't create a session until something is stored
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
    // store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set express global var as middleware, so we can access req.user from templates
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})



// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/recipes', require('./routes/recipes'))

const PORT = process.env.PORT

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
