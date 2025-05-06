


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

const PERMISSION_LEVELS = {
    VIEWER: 'viewer',  // Can only view/download
    EDITOR: 'editor',  // Can edit, rename, move
    OWNER: 'owner'     // Full control including delete and sharing
};


module.exports = {
    generateAuthToken,
    PERMISSION_LEVELS
}