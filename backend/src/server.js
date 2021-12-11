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

// set up multer storage for images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

// create multer middleware with file limitations
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1000000,
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
  }
})


// root route
app.get('/', indexRoute.get);

// device route
app.get('/devices', deviceRoute.list)
app.all('/devices/:id',isAuthenticated, deviceRoute.load)
app.get('/devices/:id',isAuthenticated, deviceRoute.get)
app.post('/devices', isAuthenticated, deviceRoute.post)

// user route
app.get('/profile', userRoute.profile)
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