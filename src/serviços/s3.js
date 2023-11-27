const aws = require('aws-sdk')

const {
    S3
} = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT)

const s3 = new S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.BUCKET_KEY_ID,
        secretAccessKey:process.env.BUCKET_APP_KEY
    }
})

module.exports = s3