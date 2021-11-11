import express from 'express'
import dotenv from 'dotenv'
import * as device from './routes/devicesRoute.js'
import { connect } from './database/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// enable application/json parsing
app.use(express.json());


// root route
app.get('/', (req, res) => {
    res.send("Hello World!")
});

// device route
app.get('/devices', device.list)
app.all('/devices/:id', device.load)
app.get('/devices/:id', device.get)
app.post('/devices', device.post)

// connect data base should be refactored to handle errors
await connect();


app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}.`)
})