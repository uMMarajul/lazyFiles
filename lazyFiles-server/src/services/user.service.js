
const  User  = require('../models/user.model');
const {verifyGoogleToken, generateAuthToken} = require('./google.service');


const login = async (userData) => {

    const credential = userData.token;

    if (!credential) {
        throw new Error('Invalid credentials');
    }

    const userInfo = await verifyGoogleToken(credential);
    console.log('userInfo', userInfo);

    // Check if user already exists
    let user = await User.findOne({ email: userInfo.email }).lean();

    if (!user) {
        user = new User({
            name: userInfo.name,
            email: userInfo.email,
            profilePicture: userInfo.picture,
            provider: 'google',
            googleId: userInfo.userId
        });
        await user.save();
    }
    // Generate JWT token
    return {...user, token: generateAuthToken(userInfo.email, user._id)}
}

const getProfile = async (userId) => {

    if (!userId) {
        throw new Error('User ID is required');
    }

    const user = await User.findById(userId).select('-__v -createdAt -updatedAt').lean();

    if (!user) {
        throw new Error('User not found');
    }

    return user;

}


module.exports = {
    login,
    getProfile
}