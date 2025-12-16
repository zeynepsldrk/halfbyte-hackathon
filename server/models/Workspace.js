const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    workspaceId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
        required: true // Odayı kuran kişi
    },
    members: [{
        type: String // Üye olan kullanıcıların 'username'leri
    }]
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
