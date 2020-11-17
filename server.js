// imports
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')

const routes = require('./routes')
const passport = require('./passport')

const port = process.env.PORT || 4000
const app = express()

// middleware - server logging
app.use(morgan('dev'))

// middleware - JSON parsing
app.use(express.json())

// middleware - cors
const corsOptions = {
  // from which URLs do we want to accept requests
  origin: ['http://localhost:3000'],
  credentials: true, // allow the session cookie to be sent to and from the client
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

// middleware - session config
app.use(session({
  // session is stored in the DB
  secret: "REPLACE_THIS_WITH_A_REAL_SECRET",
  resave: false, // will not resave sessions
  saveUninitialized: false, // only create a session when a property is added to the session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  } 
}))

// middleware - passport config
app.use(passport.initialize())
app.use(passport.session())

// middleware - API routes
app.use('/api/v1/auth', routes.auth)

// connection
app.listen(port, () => console.log(`Server is running on port ${port}`))




// DB Creation and Setup
////////////////////////
// Assume we have a basic express app set up
// 1. Create the database `$ createdb nameOfDb`
// 1. Install sequelize and pg  `$ npm i sequelize pg`
// 2. Initialize the project with sequelize `$ sequelize init`
//    - adds a config/config.json to the project (for connecting to the DB)
//    - adds a models/index.js to the project
//    - adds an empty migrations folder to the project
// 3. To create a model and associated migration file run `$ sequelize model:create...`
//    - --name modelName
//    - --attributes attributeName:dataType,attributeName2:dataType
//    - adds a models/modelName.js file
//    - adds a migrations/20201019100347_modelMigration.js file
// 4. Migrate the changes, in other words, translate the model to a table stored in DB
//    - run command `$ sequelize db:migrate`
// 5. Wherever you intend to access items in the database through the model, we need to
//    require the models folder and save it to some variable
//    - `const db = require('./models')` 
