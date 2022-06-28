require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const gridfsRouter = require('./routes/gridfs')
const postRouter = require('./routes/post');


const port = process.env.PORT || 9000;
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
})


const app = express()
//middleware
app.use(fileUpload())
app.use(bodyParser.json())
app.use(cors())


// routes
app.use('/api', gridfsRouter)
app.use('/api', postRouter)

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))