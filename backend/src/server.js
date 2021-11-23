import express from 'express'
import cors from 'cors'
import indexRoute from './routes/index.js'
import deviceRoute from './routes/devicesRoute.js'
import imageRoute from './routes/imageRoute.js'
import userRoute from './routes/userRoute.js'
import { connect } from './database/database.js'
import initializePassport from './middleware/passport.js'
import isAuthenticated from './middleware/authentication.js'
import session from 'express-session';
import passport from 'passport'
import config from './config/config.js'
import path from 'path'
import multer from 'multer'

const app = express();
const PORT = config.general.port;

// enable cross origin requests
app.use(cors());

// enable application/json parsing
app.use(express.json());

// setup authentication and sessions
initializePassport(passport);
app.use(session({
  secret: config.sessions.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// set up multer storage for images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })


// root route
app.get('/', indexRoute.get);

// device route
app.get('/devices', deviceRoute.list)
app.all('/devices/:id', deviceRoute.load)
app.get('/devices/:id', deviceRoute.get)
app.post('/devices', isAuthenticated, deviceRoute.post)

// user route
app.post('/register', userRoute.register)
app.post('/login', userRoute.login)
app.delete('/logout', userRoute.logout)

// image route
app.get('/images/:id', imageRoute.get)
app.post('/images/upload', isAuthenticated, upload.single('image'), imageRoute.post)

// connect data base should be refactored to handle errors
await connect();


app.listen(PORT, () => {
  console.log(`Express API running on port ${PORT}.`)
})