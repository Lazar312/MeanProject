import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  url = 'http://localhost:4000'
  constructor(private http:HttpClient) { }

  login(username:string, password:string){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(this.url + '/korisnik/login', data);
  }
  addRequestDoctor(username,password,firstname,lastname,adress,phone,email,type,lotNum,Specialization,WorksAt,imageN, imageB){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      type: type,
      lotNum: lotNum,
      Specialization: Specialization,
      WorksAt: WorksAt,
      imageName: imageN,
      imageBuffer: Array.from(new Uint8Array(imageB))
    }
    return this.http.post(this.url + '/korisnik/addRequestDoctor', data);
  }
  registerDoctor(username,password,firstname,lastname,adress,phone,email,type,lotNum,Specialization,WorksAt,imageN, imageB){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      type: type,
      lotNum: lotNum,
      Specialization: Specialization,
      WorksAt: WorksAt,
      imageName: imageN,
      imageBuffer: imageB
    }
    return this.http.post(this.url + '/korisnik/registerDoctor', data);
  }
  addRequestPatient(username,password,firstname,lastname,adress,phone,email,type,imageN, imageB){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      type: type,
      imageName: imageN,
      imageBuffer: Array.from(new Uint8Array(imageB))
    }
    return this.http.post(this.url + '/korisnik/addRequestPatient', data);
  }
  register(username,password,firstname,lastname,adress,phone,email,type,imageN, imageB){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      imageName: imageN,
      imageBuffer: imageB,
      type: type
    }
    console.log(imageB);
    return this.http.post(this.url + '/korisnik/register', data);
  }
  getAllKorisnik(){
    return this.http.get(this.url + '/korisnik/getAllKorisnik');
  }
  getAllDoctors(){
    return this.http.get(this.url + '/korisnik/getAllDoctors');
  }
  changePassword(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(this.url + '/korisnik/changepassword', data);
  }
  getAllCheckups(username){
    const data = {
      username: username
    }
    return this.http.post(this.url + '/korisnik/getAllCheckups', data);
  }
  scheduleCheckup(name, doctor, date, time, price, duration, patient){
    const data = {
      name: name,
      doctor: doctor,
      date: date,
      time: time,
      price: price,
      duration: duration,
      patient: patient
    }
    return this.http.post(this.url + '/korisnik/scheduleCheckup', data);
  }
  getAllScheduledCheckups(username){
    const data = {
      doctor: username
    }
    return this.http.post(this.url + '/korisnik/getCheckup', data);
  }
  getAllScheduledCheckupsPatient(username){
    const data = {
      patient: username
    }
    return this.http.post(this.url + '/korisnik/getCheckupP', data);
  }
  cancelCheckup(name, doctor, date, time, price, duration, patient){
    const data = {
      name: name,
      doctor: doctor,
      date: date,
      time: time,
      price: price,
      duration: duration,
      patient: patient
    }
    return this.http.post(this.url + '/korisnik/cancelCheckup', data);
  }
  getAllReports(username){
    const data = {
      patient: username
    }
    return this.http.post(this.url + '/korisnik/getAllReports', data);
  }
  deleteKorisnik(username){
    const data = {
      username: username
    }
    return this.http.post(this.url + '/korisnik/deleteKorisnik', data);
  }
  updatePatient(username,firstname,lastname,adress,phone,email,imageB, imageN){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      imageName: imageN,
      imageBuffer: Array.from(new Uint8Array(imageB))
    }
    return this.http.post(this.url + '/korisnik/updatePatient', data);
  }
  updateDoctor(username,firstname,lastname,phone,email,adress,imageB, imageN,WorksAt,Specialization,lotNum){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      imageName: imageN,
      imageBuffer: Array.from(new Uint8Array(imageB)),
      WorksAt: WorksAt,
      Specialization: Specialization,
      lotNum: lotNum
    }
    console.log(imageB)
    return this.http.post(this.url + '/korisnik/updateDoctor', data);
  }
  getAllRequests(){
    return this.http.get(this.url + '/korisnik/getRequests');
  }
  deleteRequest(username){
    const data = {
      username: username
    }
    return this.http.post(this.url + '/korisnik/deleteRequest', data);
  }
  addRejected(username){
    const data = {
      username: username
    }
    return this.http.post(this.url + '/korisnik/addRejected', data);
  }
  getRejected(){
    return this.http.get(this.url + '/korisnik/getRejected');
  }
  getSelectCheckups(specialization){
    const data = {
      specialization: specialization
    }
    return this.http.post(this.url + '/korisnik/getSelectCheckups', data);
  }
  getAllSelectCheckups(){
    return this.http.get(this.url + '/korisnik/getAllSelectCheckups');
  }
  deleteCheckup(name,doctor){
    const data = {
      name: name,
      doctor: doctor
    }
    return this.http.post(this.url + '/korisnik/deleteCheckup', data);
  }
  deleteCheckupName(name){ 
    const data = {
      name: name
    }
    return this.http.post(this.url + '/korisnik/deleteCheckupName', data);
  }
  deleteCheckupDoctor(doctor){
    const data = {
      doctor: doctor
    }
    return this.http.post(this.url + '/korisnik/deleteCheckupDoctor', data);
  }
  addSelectCheckups(name,specialization,price,duration){
    const data = {
      name: name,
      specialization: specialization,
      price: price,
      duration: duration
    }
    return this.http.post(this.url + '/korisnik/addSelectCheckups', data);
  }
  deleteSelectCheckup(name,specialization){
    const data = {
      name: name,
      specialization: specialization
    }
    return this.http.post(this.url + '/korisnik/deleteSelectCheckup', data);
  }
  updateSelectCheckup(name, newName,specialization,price,duration){
    const data = {
      name: name,
      specialization: specialization,
      price: price,
      duration: duration,
      newName: newName
    }
    return this.http.post(this.url + '/korisnik/updateSelectCheckup', data);
  }
  addCheckup(name,doctor,price,duration){
    const data = {
      name: name,
      doctor: doctor,
      price: price,
      duration: duration
    }
    return this.http.post(this.url + '/korisnik/addCheckup', data);
  }
  addCheckupRequested(name,doctor,price,duration,specialization){
    const data = {
      name: name,
      doctor: doctor,
      price: price,
      duration: duration,
      specialization: specialization
    }
    return this.http.post(this.url + '/korisnik/addCheckupRequested', data);
  }
  getCheckupRequested(){
    return this.http.get(this.url + '/korisnik/getCheckupRequested');
  }
  deleteCheckupRequested(name,doctor){
    const data = {
      name: name,
      doctor: doctor
    }
    return this.http.post(this.url + '/korisnik/deleteCheckupRequested', data);
  }
  getAllSpecializations(){
    return this.http.get(this.url + '/korisnik/getAllSpecialization');
  }
  addSpecialization(specialization){
    const data = {
      specialization: specialization
    }
    return this.http.post(this.url + '/korisnik/addSpecialization', data);
  }
  updatePatientInfo(username,firstname,lastname,adress,phone,email){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
    }
    return this.http.post(this.url + '/korisnik/updatePatientInfo', data);
  }
  updateDoctorInfo(username,firstname,lastname,adress,phone,email,WorksAt,Specialization,lotNum){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      WorksAt: WorksAt,
      Specialization: Specialization,
      lotNum: lotNum
    }
    return this.http.post(this.url + '/korisnik/updateDoctorInfo', data);
  }
  updateKorisnikImage(username,imageB, imageN){
    const data = {
      username: username,
      imageName: imageN,
      imageBuffer: Array.from(new Uint8Array(imageB))
    }
    return this.http.post(this.url + '/korisnik/updateKorisnikImage', data);
  }
  addReport(diagnose,cause,theraphy,date,patient,doctor,time,dateControl,specialization){
    const data = {
      diagnose: diagnose,
      cause: cause,
      theraphy: theraphy,
      date: date,
      patient: patient,
      doctor: doctor,
      time: time,
      dateControl: dateControl,
      specialization: specialization
    }
    return this.http.post(this.url + '/korisnik/addReport', data);
  }
  deleteCheckupOrdered(name,duration,price,doctor,date,time,patient){
    const data = {
      name: name,
      duration: duration,
      price: price,
      doctor: doctor,
      date: date,
      time: time,
      patient: patient
    }
    return this.http.post(this.url + '/korisnik/deleteCheckupOrdered', data);
  }
  
  readNotification(text,patient,read, timeMiliseconds){
    const data = {
      text: text,
      patient: patient,
      read: read,
      timeMiliseconds: timeMiliseconds
    }
    return this.http.post(this.url + '/korisnik/readNotification', data);
  }
  addNotification(text,patient,read, timeMiliseconds){
    const data = {
      text: text,
      patient: patient,
      read: read,
      timeMiliseconds: timeMiliseconds
    }
    return this.http.post(this.url + '/korisnik/addNotification', data);
  }
  getAllNotifications(){
    return this.http.get(this.url + '/korisnik/getAllNotifications');
  }
  deleteNotification(text,patient,read, timeMiliseconds){
    const data = {
      text: text,
      patient: patient,
      read: read,
      timeMiliseconds: timeMiliseconds  
    }
    return this.http.post(this.url + '/korisnik/deleteNotification', data);
  }
  findNotification(timeMiliseconds){
    const data = {
      timeMiliseconds: timeMiliseconds
    }
    return this.http.post(this.url + '/korisnik/findNotification', data);
  }
  generatePDF(cause,theraphy,diagnose,patient,doctor,time,dateControl,specialization,date,email){
    const data = {
      cause: cause,
      theraphy: theraphy,
      diagnose: diagnose,
      patient: patient,
      doctor: doctor,
      time: time,
      dateControl: dateControl,
      specialization: specialization,
      date: date,
      email: email
    }
    return this.http.post(this.url + '/korisnik/generatePDF', data);
  }
  updateCheckup(name,newName,price,duration){
    const data = {
      name: name,
      price: price,
      duration: duration,
      newName: newName
    }
    return this.http.post(this.url + '/korisnik/updateCheckup', data);
  }
}
