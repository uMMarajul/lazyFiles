const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');

async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify your CLIENT_ID
        });

        const payload = ticket.getPayload();
        const userid = payload['sub']; // Google's unique ID for the user

        return {
            userId: userid,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
    } catch (error) {
        throw new Error('Invalid Google token');
    }
}

function generateAuthToken( email, id) {

    try{
        return jwt.sign({email, id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
    }
    catch (error) {
        console.error('Error generating auth token:', error);
        throw new Error('Token generation failed');
    }

}

module.exports = {
    verifyGoogleToken,
    generateAuthToken
};