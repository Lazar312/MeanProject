import KorisnikModel from "../Modules/Korisnik";
import express from 'express'
import { Request } from 'express';
import CheckupModel from "../Modules/Checkups";
import Checkups_opderedModule from "../Modules/Checkups_ordered";
import ReportsModel from "../Modules/Reports";
import RequestModel from "../Modules/Requests";
import RejectedModel from "../Modules/Rejected";
import SelectCheckupModel from "../Modules/SelectCheckup";
import CheckupRequestedModel from "../Modules/CheckupRequsted";
import SpecializationModel from "../Modules/Specialization";
import NotificationModel from "../Modules/Notification";
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');

interface CustomRequest extends Request {
    files: any;
  }

export class KorisnikController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        KorisnikModel.findOne({username: username, password: password}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    register = (req: CustomRequest, res: express.Response) => {
        let Korisnik = new KorisnikModel({
            ImageBuffer: req.body.imageBuffer,
            imageName: req.body.imageName,
            adress: req.body.adress,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type
            })
        Korisnik.save().then(korisnik => {
            res.status(200).json({'korisnik': 'ok'});
        }).catch(err => {
            res.status(400).json({'korisnik': 'no'});
        })
    }

    registerDoctor = (req: CustomRequest, res: express.Response) => {
        let Korisnik = new KorisnikModel({
            ImageBuffer: req.body.imageBuffer,
            imageName: req.body.imageName,
            adress: req.body.adress,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type,
            lotNum: req.body.lotNum,
            Specialization: req.body.Specialization,
            WorksAt: req.body.WorksAt
            })
        Korisnik.save().then(korisnik => {
            res.status(200).json({'korisnik': 'ok'});
        }).catch(err => {
            res.status(400).json({'korisnik': 'no'});
        })
    }

    getAllKorisnik = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    getAllDoctors = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({type: 'doctor'}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
    changepassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        KorisnikModel.findOneAndUpdate({username: username}, {password: password}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
    getAllCheckups = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        CheckupModel.find({doctor: username}, (err, checkups) => {
            if(err) console.log(err);
            else {
                res.json(checkups);
                
            }
        })
    }
    scheduleCheckup = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let date = req.body.date;
        let time = req.body.time;
        let price = req.body.price;
        let duration = req.body.duration;
        let checkup = new Checkups_opderedModule({
            doctor: doctor,
            date: date,
            time: time,
            price: price,
            duration: duration,
            name: req.body.name,
            patient: req.body.patient
        })
        checkup.save().then(checkup => {
            res.status(200).json({'checkup': 'ok'});
        }).catch(err => {
            res.status(400).json({'checkup': 'no'});
        })
    }
    getAllScheduledCheckups = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        Checkups_opderedModule.find({doctor: doctor}, (err, checkups) => {
            if(err) console.log(err);
            else {
                res.json(checkups);
                
            }
        })
    }
    getAllScheduledCheckupsPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;
        Checkups_opderedModule.find({patient: patient}, (err, checkups) => {
            if(err) console.log(err);
            else {
                res.json(checkups);
                
            }
        })
    }
    cancelCheckup = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let date = req.body.date;
        let time = req.body.time;
        let price = req.body.price;
        let duration = req.body.duration;
        let patient = req.body.patient;
        Checkups_opderedModule.deleteOne({doctor: doctor, date: date, time: time, price: price, duration: duration, patient: patient}, (err, checkups) => {
            if(err) console.log(err);
            else {
                res.json(checkups);
                
            }
        })
    }
    getAllReports = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;
        ReportsModel.find({patient: patient}, (err, reports) => {
            if(err) console.log(err);
            else {
                res.json(reports);
                
            }
        })
    }
    deleteKorisnik = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        KorisnikModel.deleteOne({username: username}, (err, korisnik) => {
            if(err) console.log(err);
            else {
                res.json(korisnik);
                
            }
        })
    }
    updatePatient = (req: CustomRequest, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let email = req.body.email;
        let adress = req.body.adress;
        let imageName = req.body.imageName;
        let imageBuffer = req.body.imageBuffer;
        
        KorisnikModel.findOneAndUpdate({username: username}, {firstname: firstname, lastname: lastname, phone: phone, email: email, adress: adress,
        ImageBuffer: imageBuffer, imageName: imageName}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    updateDoctor = (req: CustomRequest, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let email = req.body.email;
        let adress = req.body.adress;
        let imageName = req.body.imageName;
        let imageBuffer = req.body.imageBuffer;
        let WorksAt = req.body.WorksAt;
        let Specialization = req.body.Specialization;
        let lotNum = req.body.lotNum;
        KorisnikModel.findOneAndUpdate({username: username}, {firstname: firstname, lastname: lastname, phone: phone, email: email, adress: adress,
        ImageBuffer: imageBuffer, imageName: imageName, WorksAt: WorksAt, Specialization: Specialization, lotNum: lotNum}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    getAllRequests = (req: express.Request, res: express.Response) => {
        RequestModel.find({}, (err, requests) => {
            if(err) console.log(err);
            else {
                res.json(requests);
                
            }
        })
    }
    addRejected = (req: express.Request, res: express.Response) => {
        let rejected = new RejectedModel({
            username: req.body.username
        })
        rejected.save().then(rejected => {
            res.status(200).json({'rejected': 'ok'});
        }).catch(err => {
            res.status(400).json({'rejected': 'no'});
        })
    }
    deleteRequest = (req: express.Request, res: express.Response) => {
        RequestModel.findOneAndDelete({username: req.body.username}, (err, requests) => {
            if(err) console.log(err);
            else {
                res.json(requests);
                
            }
        })
    }
    addRequestPatient = (req: CustomRequest, res: express.Response) => {
        let request = new RequestModel({
            ImageBuffer: req.body.imageBuffer,
            imageName: req.body.imageName,
            adress: req.body.adress,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type
            })
        request.save().then(request => {
            res.status(200).json({'request': 'ok'});
        }).catch(err => {
            res.status(400).json({'request': 'no'});
        })
    }
    addRequestDoctor = (req: CustomRequest, res: express.Response) => {
        let request = new RequestModel({
            ImageBuffer: req.body.imageBuffer,
            imageName: req.body.imageName,
            adress: req.body.adress,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type,
            lotNum: req.body.lotNum,
            Specialization: req.body.Specialization,
            WorksAt: req.body.WorksAt
            })
        request.save().then(request => {
            res.status(200).json({'request': 'ok'});
        }).catch(err => {
            res.status(400).json({'request': 'no'});
        })
    }
    getRejected = (req: express.Request, res: express.Response) => {
        RejectedModel.find({}, (err, rejected) => {
            if(err) console.log(err);
            else {
                res.json(rejected);
                
            }
        })
    }
    getSelectCheckup = (req: express.Request, res: express.Response) => {
        SelectCheckupModel.find({specialization:req.body.specialization}, (err, selectCheckup) => {
            if(err) console.log(err);
            else {
                res.json(selectCheckup);
                
            }
        })
    }
    addSelectCheckup = (req: express.Request, res: express.Response) => {
        let selectCheckup = new SelectCheckupModel({
            price: req.body.price,
            duration: req.body.duration,
            name: req.body.name,
            specialization: req.body.specialization
        })
        selectCheckup.save().then(selectCheckup => {
            res.status(200).json({'selectCheckup': 'ok'});
        }).catch(err => {
            res.status(400).json({'selectCheckup': 'no'});
        })
    }
    deleteCheckup = (req: express.Request, res: express.Response) => {
        CheckupModel.deleteOne({name: req.body.name, doctor: req.body.doctor}, (err, checkup) => {
            if(err) console.log(err);
            else {
                res.json(checkup);
                
            }
        })
    }
    deleteCheckupDoctor = (req: express.Request, res: express.Response) => {
        CheckupModel.deleteMany({doctor: req.body.doctor}, (err, checkup) => {
            if(err) console.log(err);
            else {
                res.json(checkup);
            }
        })
    }
    deleteCheckupName = (req: express.Request, res: express.Response) => {
        CheckupModel.deleteMany({name: req.body.name}, (err, checkup) => {
            if(err) console.log(err);
            else {
                res.json(checkup);
            }
        })
    }
    addCheckup = (req: express.Request, res: express.Response) => {
        let checkup = new CheckupModel({
            price: req.body.price,
            duration: req.body.duration,
            name: req.body.name,
            doctor: req.body.doctor
        })
        checkup.save().then(checkup => {
            res.status(200).json({'checkup': 'ok'});
        }).catch(err => {
            res.status(400).json({'checkup': 'no'});
        })
    }
    getCheckupRequested = (req: express.Request, res: express.Response) => {
        CheckupRequestedModel.find({}, (err, checkup) => {
            if(err) console.log(err);
            else res.json(checkup);
        })
    }
    addCheckupRequested = (req: express.Request, res: express.Response) => {
        let checkup = new CheckupRequestedModel({
            price: req.body.price,
            duration: req.body.duration,
            name: req.body.name,
            doctor: req.body.doctor,
            specialization: req.body.specialization
        })
        checkup.save().then(checkup => {
            res.status(200).json({'checkup': 'ok'});
        }).catch(err => {
            res.status(400).json({'checkup': 'no'});
        })
    }

    deleteCheckupRequested = (req: express.Request, res: express.Response) => {
        CheckupRequestedModel.deleteOne({name: req.body.name, doctor: req.body.doctor}, (err, checkup) => {
            if(err) console.log(err);
            else {
                res.json(checkup);
                
            }
        })
    }
    getAllSelectCheckups = (req: express.Request, res: express.Response) => {
        SelectCheckupModel.find({}, (err, checkup) => {
            if(err) console.log(err);
            else res.json(checkup);
        })
    }
    deleteSelectCheckup = (req: express.Request, res: express.Response) => {
        SelectCheckupModel.deleteOne({name: req.body.name, specialization: req.body.specialization}, (err, checkup) => {
            if(err) console.log(err);
            else {
                res.json(checkup);
                
            }
        })
    }
    updateSelectCheckup = (req: express.Request, res: express.Response) => {
        let price = req.body.price;
        let duration = req.body.duration;
        let name = req.body.name;
        let specialization = req.body.specialization;
        SelectCheckupModel.findOneAndUpdate({name: name, specialization: specialization}, {name: req.body.newName, price: price, duration: duration}, (err, checkup) => {
            if(err) console.log(err);
            else res.json(checkup);
        })
    }
    getAllSpecialization = (req: express.Request, res: express.Response) => {
        SpecializationModel.find({}, (err, checkup) => {
            if(err) console.log(err);
            else res.json(checkup);
        })
    }
    addSpecialization = (req: express.Request, res: express.Response) => {
        let specialization = new SpecializationModel({
            specialization: req.body.specialization
        })
        specialization.save().then(specialization => {
            res.status(200).json({'checkup': 'ok'});
        }).catch(err => {
            res.status(400).json({'checkup': 'no'});
        })
    }
    updatePatientInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let email = req.body.email;
        let adress = req.body.adress;
        KorisnikModel.findOneAndUpdate({username: username}, {firstname: firstname, lastname: lastname, phone: phone, email: email, adress: adress}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
    updateDoctorInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let email = req.body.email;
        let adress = req.body.adress;
        let WorksAt = req.body.WorksAt;
        let Specialization = req.body.Specialization;
        let lotNum = req.body.lotNum;
        KorisnikModel.findOneAndUpdate({username: username}, {firstname: firstname, lastname: lastname, phone: phone, email: email, adress: adress,
        WorksAt: WorksAt, Specialization: Specialization, lotNum: lotNum}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
    updateKorisnikImage = (req: CustomRequest, res: express.Response) => {
        let username = req.body.username;
        let imageName = req.body.imageName;
        let imageBuffer = req.body.imageBuffer;
        KorisnikModel.findOneAndUpdate({username: username}, {ImageBuffer: imageBuffer, imageName: imageName}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
    addReport = (req: express.Request, res: express.Response) => {
        let report = new ReportsModel({
            diagnose: req.body.diagnose,
            cause: req.body.cause,
            teraphy: req.body.theraphy,
            specialization: req.body.specialization,
            time: req.body.time,
            dateControl: req.body.dateControl,
            date: req.body.date,
            doctor: req.body.doctor,
            patient: req.body.patient
        })
        report.save().then(report => {
            res.status(200).json({'report': 'ok'});
        }).catch(err => {
            res.status(400).json({'report': 'no'});
        })
    }
    deleteCheckupOrdered = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let doctor = req.body.doctor;
        let date = req.body.date;
        let time = req.body.time;
        let price = req.body.price;
        let duration = req.body.duration;
        let patient = req.body.patient;
        Checkups_opderedModule.deleteOne({name: name, doctor: doctor, date: date, time: time, price: price, duration: duration, patient: patient}, (err, checkups) => {
            if(err) console.log(err);
            else {
                res.json(checkups);
                
            }
        })
    }
    getAllNotifications = (req: express.Request, res: express.Response) => {
        NotificationModel.find({}).sort({timeMiliseconds: -1}).exec((err, notifications) => {
            if(err) console.log(err);
            else {
                res.json(notifications);   
            }
        })
    }
    addNotification = (req: express.Request, res: express.Response) => {
        let notification = new NotificationModel({
            text: req.body.text,
            patient: req.body.patient,
            read: req.body.read,
            timeMiliseconds: req.body.timeMiliseconds
        })
        notification.save().then(notification => {
            res.status(200).json({'notification': 'ok'});
        }).catch(err => {
            res.status(400).json({'notification': 'no'});
        })
    }
    deleteNotification = (req: express.Request, res: express.Response) => {
        NotificationModel.findOneAndDelete({text: req.body.text, patient: req.body.patient, timeMiliseconds: req.body.timeMiliseconds}, (err, notification) => {
            if(err) console.log(err);
            else {
                res.json(notification);
                
            }
        })
    }
    findNotification = (req: express.Request, res: express.Response) => {
        NotificationModel.findOne({timeMiliseconds: req.body.timeMiliseconds}, (err, notification) => {
            if(err) console.log(err);
            else {
                res.json(notification);
            }}
        )
    }
    readNotification = (req: express.Request, res: express.Response) => {
        NotificationModel.updateOne({text: req.body.text, patient: req.body.patient, read: false, timeMiliseconds: req.body.timeMiliseconds}, {read: true}, (err, notification) => {
            if(err) console.log(err);
            else {
                res.json(notification);
                
            }
        })
    }
    
    generatePDF = (req: express.Request, res: express.Response) => {
        
        const doc = new PDFDocument();
        const fileName = `src/PDFDOCS/${Date.now()}.pdf`;
        
        doc.pipe(fs.createWriteStream(fileName));
        doc.fontSize(16).text('Razlog dolaska: ' + req.body.cause);
        doc.text('Dijagnoza: ' + req.body.diagnose);
        doc.text('Terapija: ' + req.body.theraphy);
        doc.text('Datum: ' + req.body.date);
        doc.text('Vreme: ' + req.body.time);
        doc.text('Specijalizacija: ' + req.body.specialization);
        doc.text('Doktor: ' + req.body.doctor);
        doc.end();
        const qrData = 'http://localhost:4000/' + fileName;
        qrcode.toFile('qrcode.png', qrData, (err) => {
            if (err) {
              console.error('Error generating QR code:', err);
            } else {
              console.log('QR code generated successfully');
            }
          });
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'projekatpia200365@gmail.com',
              pass: "sczhlomooyupxuzo"
            }
          });
          var mailOptions = {
            from: 'projekatpia200365@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'PDF: http://localhost:4000/' + fileName,
            attachments: [
                {
                  filename: 'qrcode.png',
                  path: 'qrcode.png', 
                },
              ],
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              fs.unlinkSync('qrcode.png');
              res.json(info.response);
            }
          });
    }
    updateCheckup = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let price = req.body.price;
        let duration = req.body.duration;
        CheckupModel.findOneAndUpdate({name: name}, {name:req.body.newName, price: price, duration: duration}, (err, checkup) => {
            if(err) console.log(err);
            else res.json(checkup);
        })
    }
}