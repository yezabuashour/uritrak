const mongoose = require("mongoose");

// patient schema
const PatientSchema = new mongoose.Schema({
    _id: {type:Number, required:true},
    name: String,
    address: String,
    phone: Number,
    birthdate: Date,
    status: Boolean,
    gender: String,
    martialStatus: String,
    race: String,
    measurements: [{ chloride: Number, dateTime: {type:String, default: new Date()} }]
});

const Patient = mongoose.model('patients', PatientSchema);
module.exports = Patient;