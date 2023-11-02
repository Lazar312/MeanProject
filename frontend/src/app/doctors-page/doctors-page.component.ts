import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Checkup } from '../Checkup';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { ScheduledCheckup } from '../ScheduledCheckup';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css']
})
export class DoctorsPageComponent implements OnInit {

  constructor(private korisnikService:KorisnikService, private router:Router) { }
  username: string;
  firstname: string;
  lastname: string;
  Specialization: string;
  WorksAt: string;
  Checkups: Checkup[] = [];
  selected: string = "0";
  date: string;
  time: string;
  price: number;
  duration: number;
  Message: string;
  MessageError: string;
  AllSchedule: ScheduledCheckup[] = [];
  patient: string;
  usernameP: string
  
  calendarOptions: CalendarOptions = {
    contentHeight: "auto",
    
    eventBackgroundColor: '#007bff',
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin
    ],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' 
    },
    weekends: true,
    selectable: true,
    dateClick: this.handleEventClick.bind(this),
    events: [
    ]
  };
  handleEventClick(eventClickInfo: any): void {
    const event = eventClickInfo.date;
    const year = event.getFullYear().toString().padStart(2, '0');;
    const month = (event.getMonth() + 1).toString().padStart(2, '0');;
    const day = event.getDate().toString().padStart(2, '0');;
    this.date = year + "-" + month + "-" + day;
    const minutes = event.getMinutes().toString().padStart(2, '0');;
    const hours = event.getHours().toString().padStart(2, '0');
    this.time = hours + ":" + minutes;
    this.schedule();
  }
  
  ngOnInit(): void {
    this.usernameP = localStorage.getItem('username');
    if(this.usernameP == "null" || this.usernameP == null){
      this.router.navigate(['']);
      localStorage.clear();
    }
    this.username = localStorage.getItem('usernamed');
    this.firstname = localStorage.getItem('firstnamed');
    this.lastname = localStorage.getItem('lastnamed');
    this.Specialization = localStorage.getItem('specializationd');
    this.WorksAt = localStorage.getItem('worksAtd');
    this.patient = localStorage.getItem('patient');
    this.korisnikService.getAllCheckups(this.username).subscribe((check: Checkup[]) =>{
      this.Checkups = check;
    })
    this.korisnikService.getAllScheduledCheckups(this.username).subscribe((check: ScheduledCheckup[]) =>{
      this.AllSchedule = check;
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
    })
   
  }
 

  back(){
    this.router.navigate(['patient/doctors']);
  }
  schedule(){
    this.MessageError = null;
    this.Message = null;
    for(let i of this.Checkups){
      if(i.name == this.selected){
        this.price = i.price;
        this.duration = i.duration;
      }
    }
    if(this.selected == "0" || this.date == undefined || this.time == undefined || this.price == undefined || this.duration == undefined){
      this.MessageError = "Neispravan pregled";
      return
    }
    
    let datefrom00 = new Date(this.date);
    const [hoursStr, miunutesStr] = this.time.split(":");
    let hours = parseInt(hoursStr,10);
    let minutes = parseInt(miunutesStr,10);
    datefrom00.setHours(hours,minutes,0,0);
    if (new Date(datefrom00).getTime() < new Date().getTime()){
      this.MessageError = "Neispravan datum";
      return;
    }
    for(let i of this.AllSchedule){
      const [hoursStrtemp, miunutesStrtemp] = i.time.split(":");
      let hourstemp = parseInt(hoursStrtemp,10);
      let minutestemp = parseInt(miunutesStrtemp,10);
      let datetemp = new Date(i.date);
      datetemp.setHours(hourstemp,minutestemp,0,0);
      if((((datetemp.getTime() - datefrom00.getTime()) < this.duration*60*1000)  && (datetemp.getTime() - datefrom00.getTime()) >= 0) 
      || (((datefrom00.getTime() - datetemp.getTime() ) < i.duration*60*1000) && (datefrom00.getTime() - datetemp.getTime() ) >= 0)){
        this.MessageError = "Termin zauzet";
        return;
      }
    }
    
    this.korisnikService.scheduleCheckup(this.selected, this.username, this.date, this.time, this.price, this.duration, this.patient).subscribe((check: Checkup[]) =>{
      if(check){
        this.korisnikService.getAllScheduledCheckups(this.username).subscribe((check: ScheduledCheckup[]) =>{
          this.AllSchedule = check;
          this.Message = "Uspesno zakazan pregled";
          this.MessageError = null;
          this.korisnikService.addNotification("Zakazan pregled za " + this.date + " u " + this.time + " kod doktora " 
          + this.firstname + " " + this.lastname + ", naziv pregleda" + this.selected ,this.patient,false,datefrom00.getTime() - 86400000).subscribe((kor: any) =>{
          })
          this.ngOnInit();
        })
      }else{
        this.MessageError = "Neuspesno zakazan pregled";
      }
    })
  }
}

