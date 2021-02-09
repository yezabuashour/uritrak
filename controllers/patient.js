const Patient = require('../models/patient');


// GET all patients
const getAllPatients = (req, res) => {
    Patient.find({}, (err, data) => {
        if (err) return res.json({ Error: err });
        return res.json(data);
    })
};


//POST new patient
const newPatient = (req, res) => {
    Patient.findOne({ _id: req.body._id }, (err, data) => {
        if (err) return res.json({ Error: err });
        if (data === null) {
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

            })
            newPatient.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
        } else {
            return res.json({ message: "Patient already exists" });
        }
    })
};

//GET patient by id
const getPatient = (req, res) => {
    let _id = req.params._id;

    Patient.findOne({ _id: _id }, (err, data) => {
        if (err) return res.json({ Error: err });
        if (!data) return res.json({ message: "Patient doesn't exist." });
        else return res.json(data);
    });
};



//POST update patient by id
const updatePatient = (req, res) => {
    let _id = req.params._id;
    let newChloride = req.body.chloride;

    const newData = {
        chloride: newChloride,
        date: new Date()
    }

    Patient.findOne({ _id: _id }, (err, data) => {
        if (err) return res.json({ Error: err });
        if (!newChloride) return res.json({ message: "No chloride measurement provided." });
        if (!data) return res.json({ message: "Patient doesn't exist." });

        data.measurements.push(newData);
        data.save(err => {
            if (err) return res.json({ message: "Measurement failed to add.", error: err });
            return res.json(data);
        })

    })
};


//DELETE delete patient by id
const deletePatient = (req, res) => {
    let _id = req.params._id;

    Patient.deleteOne({ _id: _id }, (err, data) => {
        if (err) return res.json({ Error: err });
        if (data.deletedCount === 0) return res.json({ message: "Patient doesn't exist." });
        else return res.json({ message: "Patient deleted." });
    });
};


module.exports = {
    getAllPatients,
    newPatient,
    getPatient,
    updatePatient,
    deletePatient
};