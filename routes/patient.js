const express = require('express');
const router  = express.Router();

const patientController = require('../controllers/patient');

router.get('/api/patient', patientController.getAllPatients);
router.post('/api/patient', patientController.newPatient);

router.get('/api/patient/:_id', patientController.getPatient);
router.post('/api/patient/:_id', patientController.updatePatient);
router.delete('/api/patient/:_id', patientController.deletePatient);

module.exports = router;