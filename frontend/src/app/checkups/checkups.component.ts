import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledCheckup } from '../ScheduledCheckup';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { Report } from '../Report';
import { Location } from '@angular/common';
import  jsPDF from 'jspdf';
@Component({
  selector: 'app-checkups',
  templateUrl: './checkups.component.html',
  styleUrls: ['./checkups.component.css']
})
export class CheckupsComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisnikService, private location:Location) { }
  SchgedueledCheckups: ScheduledCheckup[] = [];
  AllDoctors: Korisnik[] = [];
  usernmae: string;
  NotDoneCheckups: ScheduledCheckup[] = [];
  Allreports: Report[] = [];
  AllKorisnik: Korisnik[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPageReport: number = 5;
  currentPageReport: number = 1;
  totalPagesReport: number;
  email: string;
  ngOnInit(): void {
    this.usernmae = localStorage.getItem('username');
    if(this.usernmae == "null" || this.usernmae == null){
      this.router.navigate(['']);
      localStorage.clear();
    }
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
      var isPatient = false;
      var isDoctor = false;
      var isMenager = false;
      for(let i of this.AllKorisnik){
        if(i.username == this.usernmae){
          if(i.type == "patient"){
            isPatient = true;
            break;
          }if(i.type == "doctor"){
            isDoctor = true;
            break;
          }if(i.type == "menager"){
            isMenager = true;
            break;
          }
        }
      }
      if(!isPatient){
        if(isDoctor){
          this.router.navigate(['doctor']);
        }else if(isMenager){
          this.router.navigate(['menager']);
        }
      }
      
    })

    this.korisnikService.getAllScheduledCheckupsPatient(this.usernmae).subscribe((check: ScheduledCheckup[]) =>{
      this.SchgedueledCheckups = check;
      localStorage.setItem("username", this.usernmae);
      for(let i of this.SchgedueledCheckups){
        const [hoursStrtemp, miunutesStrtemp] = i.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(i.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        if(datetemp.getTime() > new Date().getTime()){
          this.NotDoneCheckups.push(i);
          }
      }
      this.NotDoneCheckups.sort((a,b) => {
        const [hoursStrtemp, miunutesStrtemp] = a.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(a.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        const [hoursStrtemp1, miunutesStrtemp1] = b.time.split(":");
        let hourstemp1 = parseInt(hoursStrtemp1,10);
        let minutestemp1 = parseInt(miunutesStrtemp1,10);
        let datetemp1 = new Date(b.date);
        datetemp1.setHours(hourstemp1,minutestemp1,0,0);
        return datetemp.getTime() - datetemp1.getTime();
      })
      this.totalPages = Math.ceil(this.NotDoneCheckups.length / this.itemsPerPage) == 0? 1 : Math.ceil(this.NotDoneCheckups .length / this.itemsPerPage);
      if(this.totalPages < this.currentPage){
        this.currentPage = this.totalPages;
      }
    })
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
    })
    this.korisnikService.getAllReports(this.usernmae).subscribe((rep: Report[]) =>{
      this.Allreports = rep;
      this.Allreports.sort((a,b) => {
        const [hoursStrtemp, miunutesStrtemp] = a.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(a.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        const [hoursStrtemp1, miunutesStrtemp1] = b.time.split(":");
        let hourstemp1 = parseInt(hoursStrtemp1,10);
        let minutestemp1 = parseInt(miunutesStrtemp1,10);
        let datetemp1 = new Date(b.date);
        datetemp1.setHours(hourstemp1,minutestemp1,0,0);
        return datetemp1.getTime() - datetemp.getTime();
      })
      this.totalPagesReport = Math.ceil(this.Allreports.length / this.itemsPerPage) == 0? 1 : Math.ceil(this.Allreports .length / this.itemsPerPage);
      if(this.totalPagesReport < this.currentPageReport){
        this.currentPageReport = this.totalPagesReport;
      }
    })
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getCurrentPageScheduledCheckups() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.NotDoneCheckups.slice(startIndex, endIndex);
  }
  nextPageReport() {
    if (this.currentPageReport < this.totalPagesReport) {
      this.currentPageReport++;
    }
  }
  
  previousPageReport() {
    if (this.currentPageReport > 1) {
      this.currentPageReport--;
    }
  }
  getCurrentPageReport() {
    const startIndex = (this.currentPageReport - 1) * this.itemsPerPageReport;
    const endIndex = startIndex + this.itemsPerPageReport;
    return this.Allreports.slice(startIndex, endIndex);
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  getduration(operationName){
    for(let i of this.NotDoneCheckups){
      if(i.name == operationName){
        return i.duration;
      }
    }return 0;
  }
  getDoctorname(doctorUsername){
    for(let i of this.AllDoctors){
      if(i.username == doctorUsername){
        return i.firstname + " " + i.lastname;
      }
    }return ""
  }
  getDoctorWork(doctorUsername){
    for(let i of this.AllDoctors){
      if(i.username == doctorUsername){
        return i.WorksAt;
      }
    }return ""
  }
  cancel(checkup :ScheduledCheckup){
    this.korisnikService.cancelCheckup(checkup.name, checkup.doctor, checkup.date, checkup.time, checkup.price, checkup.duration, checkup.patient).subscribe((check: ScheduledCheckup) =>{
      this.NotDoneCheckups = [];
      this.ngOnInit();
    })
  }
  async getAllReports(){
    for(let i of this.AllKorisnik){
      if(i.username == this.usernmae){
        this.email = i.email;
        break;
      }
    }
    for(let i of this.Allreports){
      if(i.patient == this.usernmae){
        const reponse = await this.korisnikService.generatePDF(i.cause,i.teraphy,i.diagnose,i.patient,i.doctor, i.time, i.dateControl, i.specialization,
          i.date,this.email).toPromise();
      }
    }
  }
  generatePDF(n: Report) {
    for(let i of this.AllKorisnik){
      if(i.username == n.patient){
        this.email = i.email;
        break;
      }
    }
    this.korisnikService.generatePDF(n.cause,n.teraphy,n.diagnose,n.patient,n.doctor, n.time, n.dateControl, n.specialization,
      n.date,this.email).subscribe((check: any) =>{
        console.log(this.usernmae);
    })
  }
  profile(){
    this.router.navigate(['patient']);
  }
  checkup(){
    
  }
  things(){
  }
  doctors(){
    this.router.navigate(['patient/doctors']);
  }
  notifications(){
    this.router.navigate(['patient/notifications']);
  }
  changepass(){
    this.router.navigate(['changepass']);
  }
  changeImage(){
  }
  changeInfo(){
  }
}
