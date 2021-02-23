let mongoose = require("mongoose");
let Patient = require('../models/patient');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Patients', () => {
    // beforeEach((done) => {
    //     Patient.deleteMany({}, (err) => {
    //         done();
    //     });
    // });
    describe('/GET patient', () => {
        it('it should GET all the patients', (done) => {
            chai.request(server)
                .get('/api/patient')
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    // describe('/POST patient', () => {
    //     it('it should not POST a patient without _id field', (done) => {
    //         let patient = {
    //             name: "test",
    //             address: "test",
    //             phone: 9999999999,
    //             birthdate: "Sat Nov 03 2018 21:58:08 GMT-0500 (Central Daylight Time)",
    //             status: false,
    //             gender: "Female",
    //             martialStatus: "Single",
    //             race: "Black"
    //         }
    //         chai.request(server)
    //             .post('/api/patient')
    //             .send(patient)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 // res.body.should.be.a('object');
    //                 // res.body.should.have.property('errors');
    //                 // res.body.errors.should.have.property('_id');
    //                 // res.body.errors.pages.should.have.property('kind').eql('required');
    //                 done();
    //             });
    //     });
    //     it('it should POST a patient ', (done) => {
    //         let patient = new Patient({
    //             _id: 737882738,
    //             name: "test",
    //             address: "test",
    //             phone: 9999999999,
    //             birthdate: "Sat Nov 03 2018 21:58:08 GMT-0500 (Central Daylight Time)",
    //             status: false,
    //             gender: "Female",
    //             martialStatus: "Single",
    //             race: "Black"
    //         });
    //         chai.request(server)
    //             .post('/api/patient')
    //             .send(patient)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 // res.body.should.be.a('object');
    //                 // res.body.patient.should.have.property('_id');
    //                 // res.body.patient.should.have.property('name');
    //                 // res.body.patient.should.have.property('address');
    //                 // res.body.patient.should.have.property('phone');
    //                 // res.body.patient.should.have.property('birthdate');
    //                 // res.body.patient.should.have.property('status');
    //                 // res.body.patient.should.have.property('gender');
    //                 // res.body.patient.should.have.property('martialStatus');
    //                 // res.body.patient.should.have.property('race');
    //                 done();
    //             });
    //     });
    // });
    // describe('/GET/:_id patient', () => {
    //     it('it should GET a patient by the given _id', (done) => {
    //         let patient = new Patient({ _id: 737882738, name: "GET /api/patient/:id" });
    //         patient.save((err, patient) => {
    //             console.log(patient);
    //             chai.request(server)
    //                 .get('/api/patient/' + patient._id)
    //                 .send(patient)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     // res.body.should.be.a('object');
    //                     // res.body.should.have.property('name');
    //                     // res.body.should.have.property('_id').eql(patient.id);
    //                     done();
    //                 });
    //         });

    //     });
    // });
    // describe('/POST/:id patient', () => {
    //     it('it should UPDATE a patient given the id', (done) => {
    //         const measurements = {
    //             chloride: 25,
    //             date: new Date()
    //         }
    //         let patient = new Patient({ _id: 737882738, name: "POST /api/patient/:id", measurements: measurements })
    //         patient.save((err, patient) => {
    //             chai.request(server)
    //                 .post('/api/patient/' + patient._id)
    //                 .send(patient)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     // res.body.should.be.a('object');
    //                     // res.body.patient.should.have.property('id').eql(737882738);
    //                     done();
    //                 });
    //         });
    //     });
    // });
    // /*
    //  * Test the /DELETE/:id route
    //  */
    // describe('/DELETE/:id patient', () => {
    //     it('it should DELETE a patient given the id', (done) => {
    //         let patient = new Patient({ _id: 237882738, name: "DELETE /api/patient/:id" })
    //         patient.save((err, patient) => {
    //             chai.request(server)
    //                 .delete('/api/patient/' + patient.id)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     // res.body.should.be.a('object');
    //                     // res.body.result.should.have.property('ok').eql(1);
    //                     // res.body.result.should.have.property('n').eql(1);
    //                     done();
    //                 });
    //         });
    //     });
    // });
    after(() => process.exit());
});