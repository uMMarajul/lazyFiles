

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
        console.error('Error creating folder:', error);
        return res.status(500).json({ message: error.message });
    }
}

const uploadFile = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;

        // Check if the file is valid
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Move the file to the upload path
        fs.renameSync(file.path, uploadPath);

        return res.status(201).json({ message: 'File uploaded successfully', filePath: uploadPath });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createFolder,
    uploadFile
}