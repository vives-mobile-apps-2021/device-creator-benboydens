import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}.`)
})