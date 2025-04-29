
const FileSystem = require('../models/file.model');

const CreateNewFolder = async (userId, folderName, parentId) => {

    const existing = await FileSystem.findOne({
        name: folderName,
        isFolder: true,
        owner: userId,
        parent: parentId
    });
    if (existing) {
        throw new Error('A folder with this name already exists in the selected directory.');
    }
    const newFolder = new FileSystem({
        name: folderName,
        isFolder: true,
        parent: parentId || null,
        owner: userId
    });
    await newFolder.save();

    return newFolder;
}


module.exports = {
    CreateNewFolder
}