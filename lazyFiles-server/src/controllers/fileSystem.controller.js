

const FileService = require("../services/file.service")

const createFolder = async (req, res) => {
    try {
        const userId = req.user.id;
        const folderName = req.body.folderName;
        const parentFolder = req.body.parentFolder || null;

        if(!folderName) {
            return res.status(400).json({ success: false, message: 'Folder name is required' });
        }
        const result = await FileService.CreateNewFolder(userId, folderName, parentFolder);
        if (result) {
            return res.status(201).json({ success:true, message: 'Folder created successfully', data: result });
        }
    } catch (error) {
        return res.status(500).json({  success: false, message: error.message });
    }
}

const uploadFile = async (req, res) => {
    try {
        const userId = req.user.id;

        if(!userId){
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const {fileName, fileSize, fileType, parent} = req.body;

        // Check if the information is valid
        if (!fileName || !fileSize || !fileType || !parent) {
            return res.status(400).json({ success: false, message: 'File name, size, type and parent are required' });
        }

        // call the controller to get preSigned URL
        const {file, preSignedUrl} = await FileService.UploadFile(userId, fileName, fileSize, fileType);

        return res.status(201).json({ success: true, data: { file, preSignedUrl } });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createFolder,
    uploadFile
}