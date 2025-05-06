// models/FileSystem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Permission levels for shared files/folders
 */
const PERMISSION_LEVELS = {
    VIEWER: 'viewer',  // Can only view/download
    EDITOR: 'editor',  // Can edit, rename, move
    OWNER: 'owner'     // Full control including delete and sharing
};

/**
 * Schema for file and folder items with sharing support
 */
const fileSystemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isFolder: {
        type: Boolean,
        required: true,
        default: false
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileSystem',
        default: null
    },
    // Original creator/owner
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Sharing permissions
    sharedWith: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        permission: {
            type: String,
            enum: Object.values(PERMISSION_LEVELS),
            default: PERMISSION_LEVELS.VIEWER
        },
        sharedAt: {
            type: Date,
            default: Date.now
        }
    }],
    // File-specific fields
    s3Key: {
        type: String,
        required: function() { return !this.isFolder; }
    },
    size: {
        type: Number,
        default: function() { return this.isFolder ? 0 : undefined; }
    },
    mimeType: {
        type: String,
        default: function() { return this.isFolder ? undefined : 'application/octet-stream'; }
    },
    extension: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for getting children
fileSystemSchema.virtual('children', {
    ref: 'FileSystem',
    localField: '_id',
    foreignField: 'parent'
});

// Virtual for calculating path
fileSystemSchema.virtual('path').get(function() {
    return this._path;
});

// Method to get path (calculate on demand)
fileSystemSchema.methods.getPath = async function() {
    if (!this.parent) return `/${this.name}`;

    const parent = await this.constructor.findById(this.parent).exec();
    if (!parent) return `/${this.name}`;

    const parentPath = await parent.getPath();
    this._path = `${parentPath}/${this.name}`;

    return this._path;
};

// Method to check if a user has access to this item
fileSystemSchema.methods.hasAccess = function(userId, requiredPermission = PERMISSION_LEVELS.VIEWER) {
    // Owner always has full access
    if (this.owner.toString() === userId.toString()) {
        return true;
    }

    // Check shared permissions
    const share = this.sharedWith.find(share =>
        share.user.toString() === userId.toString()
    );

    if (!share) return false;

    // Check if user has required permission level
    switch (requiredPermission) {
        case PERMISSION_LEVELS.VIEWER:
            return true; // Any permission level can view
        case PERMISSION_LEVELS.EDITOR:
            return share.permission === PERMISSION_LEVELS.EDITOR ||
                share.permission === PERMISSION_LEVELS.OWNER;
        case PERMISSION_LEVELS.OWNER:
            return share.permission === PERMISSION_LEVELS.OWNER;
        default:
            return false;
    }
};

// Method to share an item with another user
fileSystemSchema.methods.shareWith = async function(userId, permission = PERMISSION_LEVELS.VIEWER) {
    // Check if already shared
    const existingShare = this.sharedWith.find(share =>
        share.user.toString() === userId.toString()
    );

    if (existingShare) {
        // Update existing permission
        existingShare.permission = permission;
        existingShare.sharedAt = new Date();
    } else {
        // Add new share
        this.sharedWith.push({
            user: userId,
            permission,
            sharedAt: new Date()
        });
    }

    return this.save();
};

// Method to remove sharing for a user
fileSystemSchema.methods.removeShare = async function(userId) {
    this.sharedWith = this.sharedWith.filter(share =>
        share.user.toString() !== userId.toString()
    );

    return this.save();
};

// Generate a public access token
fileSystemSchema.methods.generatePublicAccess = async function(expiryDays = 7) {
    // Create a random token
    const token = require('crypto').randomBytes(32).toString('hex');

    // Set expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    this.isPublic = true;
    this.publicAccessToken = token;
    this.publicAccessExpiry = expiryDate;

    return this.save();
};

// Remove public access
fileSystemSchema.methods.removePublicAccess = async function() {
    this.isPublic = false;
    this.publicAccessToken = null;
    this.publicAccessExpiry = null;

    return this.save();
};

// Static method to find items a user has access to
fileSystemSchema.statics.findAccessible = async function(userId, permissionLevel = PERMISSION_LEVELS.VIEWER) {
    return this.find({
        $or: [
            { owner: userId },
            { 'sharedWith.user': userId, 'sharedWith.permission': { $in: getValidPermissions(permissionLevel) } }
        ]
    });
};

// Helper function to get valid permissions based on required level
function getValidPermissions(requiredLevel) {
    switch (requiredLevel) {
        case PERMISSION_LEVELS.VIEWER:
            return [PERMISSION_LEVELS.VIEWER, PERMISSION_LEVELS.EDITOR, PERMISSION_LEVELS.OWNER];
        case PERMISSION_LEVELS.EDITOR:
            return [PERMISSION_LEVELS.EDITOR, PERMISSION_LEVELS.OWNER];
        case PERMISSION_LEVELS.OWNER:
            return [PERMISSION_LEVELS.OWNER];
        default:
            return [];
    }
}

// Create indexes for performance
fileSystemSchema.index({ parent: 1, owner: 1, name: 1 });
fileSystemSchema.index({ owner: 1 });
fileSystemSchema.index({ 'sharedWith.user': 1 });
fileSystemSchema.index({ s3Key: 1 }, { sparse: true });
fileSystemSchema.index({ publicAccessToken: 1 }, { sparse: true });

const FileSystem = mongoose.model('FileSystem', fileSystemSchema);

// Export constants and model
module.exports = FileSystem;

