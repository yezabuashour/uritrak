const { json } = require('express');
const request = require('request');
const Patient = require('../models/patient');

// returns array of all patients
const mongoGetAllPatientsAsync = async () => {
    try {
        let data = await Patient.find({});
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// updates db with new patient document entry
const mongoPostNewPatientAsync = async (newPatient) => {
    try {
        let data = await Patient.findOne({ _id: newPatient._id });
        if (data === null) {
            try {
                let saveResponse = await newPatient.save();
                return saveResponse;
            } catch (err) {
                console.error(err);
                return ({ Error: err });
            }
        }
        return ({ message: "Patient with that _id already exists." });
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// returns a single patient by id
const mongoGetPatientAsync = async (_id) => {
    try {
        let data = await Patient.findOne({ _id: _id });
        if (!data) return ({ message: "Patient does not exist." });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// update measurements for patient by id
const mongoPostPatientUpdateAsync = async (_id, newMeasurement) => {
    try {
        let data = await Patient.findOne({ _id: _id });
        if (!data) return ({ message: "Patient does not exist." });
        data.measurements.push(newMeasurement);
        try {
            await data.save();
            return data;
        } catch (err) {
            console.error(err);
            return ({ Error: err });
        }
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// deletes patient by id
const mongoDeletePatientAsync = async (_id) => {
    try {
        let data = await Patient.deleteOne({ _id: _id });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// get /api/patient middleware
const getAllPatientsAsync = async (req, res) => {
    try {
        let data = await mongoGetAllPatientsAsync();
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// post /api/patient middleware
const postNewPatientAsync = async (req, res) => {
    const newPatient = new Patient({
        _id: req.body._id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        status: req.body.status,
        gender: req.body.gender,
        martialStatus: req.body.martialStatus,
        race: req.body.race
    });

    try {
        let data = await mongoPostNewPatientAsync(newPatient);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// get /api/patient/:id middleware
const getPatientAsync = async (req, res) => {
    try {
        let data = await mongoGetPatientAsync(req.params._id);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// post /api/patient/:id middleware
const postPatientUpdateAsync = async (req, res) => {
    let newChloride = req.body.chloride;
    if (!newChloride) return res.json({ message: "No chloride measurement provided." });

    let _id = req.params._id;
    const newMeasurement = {
        chloride: newChloride,
        date: new Date()
    }

    try {
        let data = await mongoPostPatientUpdateAsync(_id, newMeasurement);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// delete /api/patient/:id middleware
const deletePatientAsync = async (req, res) => {
    try {
        let data = await mongoDeletePatientAsync(req.params._id);
        if (data.deletedCount === 0) return res.json({ message: "Patient does not exist." });
        return res.json({ message: "Patient deleted." });
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// renders view for /patients
const viewAllPatientsAsync = async (req, res) => {
    try {
        let patients = await mongoGetAllPatientsAsync();
        patients = JSON.stringify(patients);
        let options = {
            url: 'http://127.0.0.1:5000/patient',
            body: patients
        };
        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the data received
            res.send(body); //Display the response on the website
        });
    } catch (err) {
        return res.json({ Error: err });
    }
    // try {
    //     let patients = await mongoGetAllPatientsAsync();
    //     return res.render("allPatients", { patients: patients.toString() });
    // } catch (err) {
    //     console.error(err);
    //     return res.json({ Error: err });
    // }
};

// renders view for /patients/:_id
const viewPatientAsync = async (req, res) => {
    try {
        let _id = req.params._id;
        let patient = await mongoGetPatientAsync(_id);
        return res.render("patient", { patient: patient.toString() });
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

module.exports = {
    getAllPatientsAsync,
    postNewPatientAsync,
    getPatientAsync,
    postPatientUpdateAsync,
    deletePatientAsync,
    viewAllPatientsAsync,
    viewPatientAsync
};