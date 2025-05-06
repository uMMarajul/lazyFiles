
const FileSystem = require('../models/file.model');
const { v4: uuidv4 } = require('uuid');
const AWS_Services = require('./aws.service');
const  {PERMISSION_LEVELS} = require("../utils/helper.utils")

const CreateNewFolder = async (userId, folderName, parentId) => {

    const existing = await FileSystem.findOne({
        name: folderName,
        isFolder: true,
        owner: userId,
        parent: parentId
    });
    if (existing) {
        //TODO: generate a unique name for the folder
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

const UploadFile = async (userId, fileName, fileSize, fileType, parent) => {

    //check if user is allowed to your upload the file in the selected directory
    const parentFolder = await FileSystem.findById(parent);

    if (!parentFolder || parentFolder.isFolder === false) {
        throw new Error('Invalid parent folder');
    }
    if(!parentFolder.hasAccess(userId, PERMISSION_LEVELS.EDITOR)) {
        throw new Error('You do not have permission to upload files in this directory.');
    }

    const existing = await FileSystem.findOne({
        name: fileName,
        isFolder: false,
        owner: userId,
        parent: parent
    });
    if (existing) {
        //TODO: generate a unique name for the file
        throw new Error('A file with this name already exists in the selected directory.');
    }

    const newFile = new FileSystem({
        name: fileName,
        isFolder: false,
        parent: parent || null,
        owner: userId,
        extension: fileType,
        size: fileSize,
        s3Key: uuidv4()
    });

    const preSignedUrl = await AWS_Services.preSignedUrlForUpload(newFile.s3Key, fileSize);
    if (!preSignedUrl) {
        throw new Error('Failed to generate pre-signed URL');
    }

    await newFile.save();

    return {
        file: newFile,
        preSignedUrl
    }


}


module.exports = {
    CreateNewFolder,
    UploadFile
}