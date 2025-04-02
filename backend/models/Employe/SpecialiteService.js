const mongoose = require('mongoose');
const Service = require('../Manager/Service');

const SpecialiteServiceSchema = new mongoose.Schema({
    idService: { type: mongoose.Schema.Types.ObjectId,ref: 'Service' , required: true },
    idSpecialite: { type: mongoose.Schema.Types.ObjectId,ref: 'Specialite' , required: true },
}, {timestamps: true});

module.exports = mongoose.model('SpecialiteService', SpecialiteServiceSchema);