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
import { fileURLToPath } from 'url';
import multer from 'multer'

const app = express();
const PORT = config.general.port;

// enable cross origin requests
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// set up multer storage for images
var storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)) //Appending extension
  }
})

// create multer middleware with file limitations
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/)) {
      cb(new Error('Please upload an image of type png/jpeg/webp/gif.'))
    }
    cb(undefined, true)
  }
})

// custom error handling when image requirements are not met
const us = upload.single('image');
const uploadSingleImage = function (req, res, next) {
  us(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message })
    } else {
      next();
    }
  })
}


// root route
app.get('/', indexRoute.get);

// device route
app.get('/devices', deviceRoute.list)
app.all('/devices/:id', isAuthenticated, deviceRoute.load)
app.get('/devices/:id', isAuthenticated, deviceRoute.get)
app.post('/devices', isAuthenticated, deviceRoute.post)

// user route
app.get('/profile', userRoute.profile)
app.post('/register', userRoute.register)
app.post('/login', userRoute.login)
app.delete('/logout', userRoute.logout)

// image route
app.get('/images/:id', imageRoute.get)
app.post('/images/upload', isAuthenticated, uploadSingleImage, imageRoute.post)
app.post('/avatars', uploadSingleImage, imageRoute.post)

// connect data base should be refactored to handle errors
await connect();


app.listen(PORT, () => {
  console.log(`Express API running on port ${PORT}.`)
})