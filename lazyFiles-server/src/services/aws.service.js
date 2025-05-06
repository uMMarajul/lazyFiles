

const {S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3")
const { getSignedUrl  } = require("@aws-sdk/s3-request-presigner");

const EXPIRATION_TIME = 60 * 60;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


const preSignedUrlForUpload = async (fileName, fileSize) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Expires: 60 * 60,
        condition: [
            ['content-length-range', 0, fileSize],
        ],

    };

    try {
        const command = new PutObjectCommand(params);
        return await getSignedUrl(s3, command, {expiresIn: EXPIRATION_TIME});
    } catch (error) {
        throw new Error('Failed to generate pre-signed URL');
    }
}

const preSignedUrlForDownload = async (fileName) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
    };

    try {
        const command = new GetObjectCommand(params);
        return await getSignedUrl(s3, command, {expiresIn: EXPIRATION_TIME});
    } catch (error) {
        throw new Error('Failed to generate pre-signed URL');
    }
}


module.exports = {
    preSignedUrlForUpload,
    preSignedUrlForDownload
}