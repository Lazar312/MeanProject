import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledCheckup } from '../ScheduledCheckup';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { Report } from '../Report';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-doctor-checkups',
  templateUrl: './doctor-checkups.component.html',
  styleUrls: ['./doctor-checkups.component.css']
})
export class DoctorCheckupsComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  Checkups: ScheduledCheckup[] = [];
  CheckupsByOrder: ScheduledCheckup[] = [];
  username: string;
  AllKorisnik: Korisnik[] = [];
  AllDoneCheckups: ScheduledCheckup[] = [];
  diagnose: string;
  cause: string;
  specialization: string;
  theraphy: string;
  dateControl: string;
  AddReport: boolean = false;
  Message: string;
  MessageError: string;
  MessageErrorDate: string;
  patientusername: string;
  nameDoctor: string;
  CheckupToDelete:  ScheduledCheckup;
  AllReports: Report[] = [];
  OpenReport: boolean = false;
  reason: string;
  name: string;
  duration: number;
  price: number;
  date: string;
  time: string;
  patient: string;
  addReason: boolean = false;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number
  calendarOptions: CalendarOptions = {
    contentHeight: "auto",
    
    eventBackgroundColor: '#007bff',
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin
    ],
    views: {
      timeGridTwoWeeks: {
        type: 'timeGridWeek',
        duration: { days: 14 }
      }
    },
    initialView: 'timeGridTwoWeeks',
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    weekends: true,
    selectable: true,
    events: [
    ]
  };
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
  getCurrentPageDoneCheckups() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.AllDoneCheckups.slice(startIndex, endIndex);
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username == "null" || this.username == null){
      this.router.navigate(['']);
      localStorage.clear();
    }
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
      var isPatient = false;
      var isDoctor = false;
      var isMenager = false;
      for(let i of this.AllKorisnik){
        if(i.username == this.username){
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
      if(!isDoctor){
        if(isPatient){
          this.router.navigate(['patient']);
        }else if(isMenager){
          this.router.navigate(['menager']);
        }
      }
    })
    localStorage.setItem("username", this.username);
    
    this.korisnikService.getAllScheduledCheckups(this.username).subscribe((check: ScheduledCheckup[]) =>{
      this.Checkups = check;
      const draw = (check.map(obj =>{
        const [hoursStrtemp, miunutesStrtemp] = obj.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(obj.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        let minutes = obj.duration % 60;
        let hours = obj.duration / 60;
        let date = datetemp.getDate();
        let hoursAdded = hours + hourstemp;
        if(hoursAdded >= 24){
          date = date + (hoursAdded) / 24;
          hoursAdded = hoursAdded % 24;
        }
        let datetemp1 = new Date(datetemp).setHours( hoursAdded, datetemp.getMinutes() + minutes,0,0);
        datetemp1 = new Date(datetemp1).setDate(date);
        return {
          title: obj.name,
          start: new Date(datetemp),
          end: new Date(datetemp1),
          backgroundColor: '#ff9f89',
        }
      }))
      this.calendarOptions.events = draw;
      this.Checkups.sort((a,b) => {
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
      var j = 0;
      for(let i of this.Checkups){
        const [hoursStrtemp, miunutesStrtemp] = i.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(i.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        if (new Date(datetemp).getTime() > new Date().getTime() && i.patient != null && i.patient != ""){
          j++;
          this.CheckupsByOrder.push(i);
        }
        if(j==3)break;
      }
      for(let i of this.Checkups){
        const [hoursStrtemp, miunutesStrtemp] = i.time.split(":");
        let hourstemp = parseInt(hoursStrtemp,10);
        let minutestemp = parseInt(miunutesStrtemp,10);
        let datetemp = new Date(i.date);
        datetemp.setHours(hourstemp,minutestemp,0,0);
        if (new Date(datetemp).getTime() < new Date().getTime() && i.patient != null && i.patient != ""){
          this.AllDoneCheckups.push(i);
        }
      }
      this.totalPages = Math.ceil(this.AllDoneCheckups.length / this.itemsPerPage) == 0? 1 : Math.ceil(this.AllDoneCheckups .length / this.itemsPerPage);
      if(this.totalPages < this.currentPage){
        this.currentPage = this.totalPages;
      }
    })
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
      for(let i of this.AllKorisnik){
        if(this.username == i.username){
          this.specialization = i.Specialization;
          this.nameDoctor = i.firstname + " " + i.lastname;
          break;
        }
      }
    })

  }
  cancel(n: ScheduledCheckup){
    this.name = n.name;
    this.duration = n.duration;
    this.price = n.price;
    this.date = n.date;
    this.time = n.time;
    this.patient = n.patient;
    this.addReason = true;
  }
  closeaddReason(){
    this.name = null;
    this.duration = null;
    this.price = null;
    this.date = null;
    this.time = null;
    this.patient = null;
    this.addReason = false;
  }
  cancelCheckup(){
    this.korisnikService.deleteCheckupOrdered(this.name,this.duration,this.price,this.username,this.date,this.time,this.patient).subscribe((kor: ScheduledCheckup[]) =>{
      if(this.reason == null)this.reason = "";
      this.korisnikService.addNotification("Doktor je otkazao pregled " + '"' + this.name + '"' +" koji je trebao da se odrzi " + this.date 
      + " u " + this.time + "h iz razloga: " + this.reason , this.patient, false, new Date().getTime()).subscribe((kor: Korisnik) =>{})
      this.addReason = false;
      this.reason = null;
      this.AllDoneCheckups = [];
      this.CheckupsByOrder = [];
      this.ngOnInit();
      this.reason = null;
    })
  }
  add(n: ScheduledCheckup){
    this.CheckupToDelete = n;
    this.patientusername = n.patient;
    this.MessageError = null;
    this.MessageErrorDate = null;
    this.Message = null;
    this.theraphy = null;
    this.diagnose = null;
    this.cause = null;
    this.dateControl = null;
    this.AddReport = true;
  }
  dateControlBlur(){
    if(this.dateControl == null){
      this.MessageErrorDate = "Molimo unesite datum";
      return;
    }
    let datetemp = new Date(this.dateControl);
    datetemp.setHours(0,0,0,0);
    if(datetemp.getTime() < new Date().getTime()){
      this.MessageErrorDate = "Molimo unesite datum u buducnosti";
      return;
    }
    this.MessageErrorDate = null;
  }
  look(n: ScheduledCheckup){
    this.OpenReport = true;
    this.korisnikService.getAllReports(n.patient).subscribe((kor: Report[]) =>{
      this.AllReports = kor;
    })
  }
  closelook(){
    this.OpenReport = false;
    this.AllReports = [];
  }
  addReport(){
    this.Message = null;
    if(this.MessageErrorDate != null){
      this.MessageError = "Neispravni podaci";
      return;
    }
    if(this.diagnose == null || this.cause == null || this.theraphy == null || this.dateControl == null || this.specialization == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
    }
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = now.getDate().toString().padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    this.korisnikService.addReport(this.diagnose,this.cause,this.theraphy,date,this.patientusername,this.nameDoctor,time,this.dateControl,this.specialization).subscribe((kor: ScheduledCheckup[]) =>{
      
      this.korisnikService.deleteCheckupOrdered(this.CheckupToDelete.name,this.CheckupToDelete.duration,this.CheckupToDelete.price,this.CheckupToDelete.doctor,this.CheckupToDelete.date,this.CheckupToDelete.time, this.CheckupToDelete.patient).subscribe((kor: ScheduledCheckup[]) =>{
        this.diagnose = null;
        this.cause = null;
        this.theraphy = null;
        this.dateControl = null;
        this.patientusername = null;
        this.MessageError = null;
        this.MessageErrorDate = null;
        this.Message = "Uspesno ste dodali izvestaj";
        this.AllDoneCheckups = [];
        this.AllReports = [];
        this.CheckupsByOrder = [];
        this.ngOnInit();
      })
      
    })
  }
  close(){
    this.AddReport = false;
    this.MessageError = null;
    this.MessageErrorDate = null;
    this.Message = null;
    this.diagnose = null;
    this.cause = null;
    this.theraphy = null;
    this.dateControl = null;
    this.specialization = null;
  }
  getpatientname(korisnikusername){
    for(let i of this.AllKorisnik){
      if(i.username == korisnikusername){
        return i.firstname + " " + i.lastname;
      }
    }return"";
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  profile(){
    this.router.navigate(['doctor']);
  }
  checkup(){
    this.router.navigate(['doctor/checkups']);
  }
  things(){
  }
  struff(){
    this.router.navigate(['doctor/struff']);
  }
  notifications(){
  }
  changepass(){
    this.router.navigate(['changepass']);
  }
  changeImage(){
  }
  changeInfo(){
  }
}
