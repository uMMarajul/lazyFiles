const userService = require('../services/user.service');


const login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body);
        res.cookie('access-token', user.token, { httpOnly: false, maxAge:  60 * 60 * 1000 });
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.id);
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.status(200).json({success: true,user});
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({ message: 'Profile updated', updatedUser });
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        await userService.deleteAccount(req.user.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    logout,
    login,
    getProfile,
    updateProfile,
    deleteAccount,
};
