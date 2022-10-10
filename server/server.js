// import all dependencies
const express = require("express")
const cors = require('cors') // This line is added when doing fullstack. Cors needed for front-end and back-end to "talk"
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');

//aws-sdk s3client is a library used to interact with s3 bucket
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

// this requires the dotenv library and call its config function
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY
const secretBucketAccessKey = process.env.SECRET_BUCKET_ACCESS_KEY
const s3Bucket = new S3Client({
    credentials: {
        bucketAccessKey: bucketAccessKey,
        secretBucketAccessKey: secretBucketAccessKey
    },
    region: bucketRegion
})

// mongoose config
require('./configs/mongoose.config')

// express configurations
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); // This line is added when doing fullstack with auth
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(cookieParser());


// getting the routes. This format limits making a const Routes and adding the addition Routes(app) line below.
require('./routes/user.routes')(app)


// listen to the port
app.listen(8000, ()=>console.log("Listening to the port 8000"))