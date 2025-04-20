


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