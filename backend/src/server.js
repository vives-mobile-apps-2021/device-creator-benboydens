import express from 'express'
import dotenv from 'dotenv'
import indexRoute from './routes/index.js'
import deviceRoute from './routes/devicesRoute.js'
import { connect } from './database/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// enable application/json parsing
app.use(express.json());


// root route
app.get('/', indexRoute.get);

// device route
app.get('/devices', deviceRoute.list)
app.all('/devices/:id', deviceRoute.load)
app.get('/devices/:id', deviceRoute.get)
app.post('/devices', deviceRoute.post)

// connect data base should be refactored to handle errors
await connect();


app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}.`)
})