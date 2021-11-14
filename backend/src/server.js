import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import indexRoute from './routes/index.js'
import deviceRoute from './routes/devicesRoute.js'
import imageRoute from './routes/imageRoute.js'
import { connect } from './database/database.js'
import path from 'path'
import multer from 'multer'
dotenv.config();

const app = express();
const PORT = process.env.PORT;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
const upload = multer({ storage: storage })

// enable cross origin requests
app.use(cors());

// enable application/json parsing
app.use(express.json());


// root route
app.get('/', indexRoute.get);

// device route
app.get('/devices', deviceRoute.list)
app.all('/devices/:id', deviceRoute.load)
app.get('/devices/:id', deviceRoute.get)
app.post('/devices', deviceRoute.post)

// image route
app.get('/images/:id', imageRoute.get)
app.post('/images/upload', upload.single('image'), imageRoute.post)

// connect data base should be refactored to handle errors
await connect();


app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}.`)
})