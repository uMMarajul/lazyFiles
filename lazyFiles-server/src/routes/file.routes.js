
const express = require('express');
const router = express.Router();

const fileSystemController = require('../controllers/fileSystem.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);


router.post('/getUploadUrl', fileSystemController.uploadFile);
router.post('/folders', fileSystemController.createFolder);

// router.get('/files', fileSystemController.getFiles);



module.exports = router;
