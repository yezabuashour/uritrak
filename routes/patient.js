const express = require('express');
const router  = express.Router();

const patientController = require('../controllers/patient');

router.get('/api/patient', patientController.getAllPatientsAsync);
router.post('/api/patient', patientController.postNewPatientAsync);

router.get('/api/patient/:_id', patientController.getPatientAsync);
router.post('/api/patient/:_id', patientController.postPatientUpdateAsync);
router.delete('/api/patient/:_id', patientController.deletePatientAsync);

router.get('/patients', patientController.viewAllPatientsAsync);
router.get('/patients/:_id', patientController.viewPatientAsync);

module.exports = router;