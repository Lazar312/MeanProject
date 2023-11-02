import express from 'express';
import { KorisnikController } from '../Controllers/KorisnikController';

const KorisnikRouter = express.Router();
import { Request } from 'express';


interface CustomRequest extends Request {
    files: any;
  }

KorisnikRouter.route('/login').post(
    (req, res) => new KorisnikController().login(req, res)
)

KorisnikRouter.route('/register').post(
    (req:CustomRequest, res) => new KorisnikController().register(req, res)
)

KorisnikRouter.route('/registerDoctor').post(
    (req:CustomRequest, res) => new KorisnikController().registerDoctor(req, res)
)

KorisnikRouter.route('/getAllKorisnik').get(
    (req, res) => new KorisnikController().getAllKorisnik(req, res)
)

KorisnikRouter.route('/getAllDoctors').get(
    (req, res) => new KorisnikController().getAllDoctors(req, res)
)

KorisnikRouter.route('/changepassword').post(
    (req, res) => new KorisnikController().changepassword(req, res)
)
KorisnikRouter.route('/getAllCheckups').post(
    (req, res) => new KorisnikController().getAllCheckups(req, res)
    )
KorisnikRouter.route('/scheduleCheckup').post(
    (req, res) => new KorisnikController().scheduleCheckup(req, res)
)

KorisnikRouter.route('/getCheckup').post(
    (req, res) => new KorisnikController().getAllScheduledCheckups(req, res)
)
KorisnikRouter.route('/getCheckupP').post(
    (req, res) => new KorisnikController().getAllScheduledCheckupsPatient(req, res)
)
KorisnikRouter.route('/cancelCheckup').post(
    (req, res) => new KorisnikController().cancelCheckup(req, res)
)
KorisnikRouter.route('/getAllReports').post(
    (req, res) => new KorisnikController().getAllReports(req, res)
)
KorisnikRouter.route('/deleteKorisnik').post(
    (req, res) => new KorisnikController().deleteKorisnik(req, res)
)
KorisnikRouter.route('/updatePatient').post(
    (req:CustomRequest, res) => new KorisnikController().updatePatient(req, res)
)
KorisnikRouter.route('/updateDoctor').post(
    (req:CustomRequest, res) => new KorisnikController().updateDoctor(req, res)
)
KorisnikRouter.route('/getRequests').get(
    (req, res) => new KorisnikController().getAllRequests(req, res)
)
KorisnikRouter.route('/addRejected').post(
    (req, res) => new KorisnikController().addRejected(req, res)
)
KorisnikRouter.route('/deleteRequest').post(
    (req, res) => new KorisnikController().deleteRequest(req, res)
)
KorisnikRouter.route('/addRequestDoctor').post(
    (req:CustomRequest, res) => new KorisnikController().addRequestDoctor(req, res)
)
KorisnikRouter.route('/addRequestPatient').post(
    (req:CustomRequest, res) => new KorisnikController().addRequestPatient(req, res)
)
KorisnikRouter.route('/getRejected').get(
    (req, res) => new KorisnikController().getRejected(req, res)
)
KorisnikRouter.route('/getSelectCheckups').post(
    (req, res) => new KorisnikController().getSelectCheckup(req, res)
)
KorisnikRouter.route('/addSelectCheckups').post(
    (req, res) => new KorisnikController().addSelectCheckup(req, res)
)
KorisnikRouter.route('/deleteCheckup').post(
    (req, res) => new KorisnikController().deleteCheckup(req, res)
)
KorisnikRouter.route('/addCheckup').post(
    (req, res) => new KorisnikController().addCheckup(req, res)
)
KorisnikRouter.route('/addCheckupRequested').post(
    (req, res) => new KorisnikController().addCheckupRequested(req, res)
)
KorisnikRouter.route('/getCheckupRequested').get(
    (req, res) => new KorisnikController().getCheckupRequested(req, res)
)
KorisnikRouter.route('/deleteCheckupRequested').post(
    (req, res) => new KorisnikController().deleteCheckupRequested(req, res)
)
KorisnikRouter.route('/getAllSelectCheckups').get(
    (req, res) => new KorisnikController().getAllSelectCheckups(req, res)
)
KorisnikRouter.route('/deleteSelectCheckup').post(
    (req, res) => new KorisnikController().deleteSelectCheckup(req, res)
)
KorisnikRouter.route('/updateSelectCheckup').post(
    (req, res) => new KorisnikController().updateSelectCheckup(req, res)
)
KorisnikRouter.route('/deleteCheckupName').post(
    (req, res) => new KorisnikController().deleteCheckupName(req, res)
)
KorisnikRouter.route('/getAllSpecialization').get(
    (req, res) => new KorisnikController().getAllSpecialization(req, res)
)
KorisnikRouter.route('/addSpecialization').post(
    (req, res) => new KorisnikController().addSpecialization(req, res)
)
KorisnikRouter.route('/updatePatientInfo').post(
    (req,res) => new KorisnikController().updatePatientInfo(req,res)
)
KorisnikRouter.route('/updateDoctorInfo').post(
    (req,res) => new KorisnikController().updateDoctorInfo(req,res)
)
KorisnikRouter.route('/updateKorisnikImage').post(
    (req:CustomRequest,res) => new KorisnikController().updateKorisnikImage(req,res)
)
KorisnikRouter.route('/addReport').post(
    (req,res) => new KorisnikController().addReport(req,res)
)
KorisnikRouter.route('/deleteCheckupOrdered').post(
    (req,res) => new KorisnikController().deleteCheckupOrdered(req,res)
)
KorisnikRouter.route('/getAllNotifications').get(
    (req,res) => new KorisnikController().getAllNotifications(req,res)
)
KorisnikRouter.route('/addNotification').post(
    (req,res) => new KorisnikController().addNotification(req,res)
)
KorisnikRouter.route('/deleteNotification').post(
    (req,res) => new KorisnikController().deleteNotification(req,res)
)
KorisnikRouter.route('/readNotification').post(
    (req,res) => new KorisnikController().readNotification(req,res)
)
KorisnikRouter.route('/findNotification').post(
    (req,res) => new KorisnikController().findNotification(req,res)
)
KorisnikRouter.route('/generatePDF').post(
    (req,res) => new KorisnikController().generatePDF(req,res)
)
KorisnikRouter.route('/updateCheckup').post(
    (req,res) => new KorisnikController().updateCheckup(req,res)
)
KorisnikRouter.route('/deleteCheckupDoctor').post(
    (req,res) => new KorisnikController().deleteCheckupDoctor(req,res)
)
export default KorisnikRouter;