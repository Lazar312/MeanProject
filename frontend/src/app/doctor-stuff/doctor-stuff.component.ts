import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { CheckupRequested } from '../CheckupRequested';
import { SelectCheckup } from '../SelectCheckup';
import { Korisnik } from '../Korisnik';
import { ScheduledCheckup } from '../ScheduledCheckup';

@Component({
  selector: 'app-doctor-stuff',
  templateUrl: './doctor-stuff.component.html',
  styleUrls: ['./doctor-stuff.component.css']
})
export class DoctorStuffComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisnikService) { }
  duration:number;
  price:number;
  name:string;
  username:string;
  speciialization:string;
  AllCheckupRequested: CheckupRequested[] = [];
  AllSelectCheckup: SelectCheckup[] = [];
  Message: string;
  MessageError: string;
  AllKorisnik: Korisnik[] = [];
  day: string;
  AllCheckupsOrdered: ScheduledCheckup[] = [];
  dayfrom: string;
  dayTo: string;
  MessageFreeDay: string;
  MessageErrorFreeDay: string;
  MessageErrorVacation: string;
  MessageVacation: string;
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
      this.korisnikService.getAllScheduledCheckups(this.username).subscribe((kor: ScheduledCheckup[]) =>{
        this.AllCheckupsOrdered = kor;
      })
    })
    this.speciialization = localStorage.getItem('specialization');
    localStorage.setItem("username",this.username);
    localStorage.setItem("specialization",this.speciialization);
    this.korisnikService.getCheckupRequested().subscribe((kor: CheckupRequested[]) =>{
      this.AllCheckupRequested = kor;
    })
    this.korisnikService.getAllSelectCheckups().subscribe((kor: SelectCheckup[]) =>{
      this.AllSelectCheckup = kor;
    })
  }
  add(){
    this.MessageError = null;
    this.Message = null;
    if(this.duration == null  || this.name == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
    }
    for(let i of this.AllCheckupRequested){
      if(i.name == this.name){
        this.MessageError = "Pregled sa ovim imenom vec postoji";
        return;
      }
    }
    for(let i of this.AllSelectCheckup){
      if(i.name == this.name){
        this.MessageError = "Pregled sa ovim imenom vec postoji";
        return;
      }
    }
    if(this.price == null)this.price = 30;
    this.korisnikService.addCheckupRequested(this.name,this.username,this.price,this.duration,this.speciialization).subscribe((kor: CheckupRequested) =>{
      this.ngOnInit();
      this.Message = "Uspesno ste dodali pregled";
    })
  }
  addFreeDay(){
    this.MessageFreeDay = null;
    this.MessageErrorFreeDay = null;
    if(this.day == null){
      this.MessageErrorFreeDay = "Molimo popunite sva polja";
      return;
    }
    let datefrom00 = new Date(this.day);
    datefrom00.setHours(0,0,0,0);
    if (datefrom00.getTime() < new Date().getTime()){
      this.MessageErrorFreeDay = "Neispravan datum";
      return;
    }
    for(let i of this.AllCheckupsOrdered){
      if(i.date == this.day){
        this.MessageErrorFreeDay = "Vec ste zakazali pregled za ovaj dan";
        return;
      }
    }
    this.korisnikService.scheduleCheckup("",this.username,this.day,"00:00",0,1440,"").subscribe((kor: any) =>{
      this.ngOnInit();
      this.MessageFreeDay = "Uspesno ste dodali slobodan dan";
    })
  }
  addVacation(){
    this.MessageVacation = null;
    this.MessageErrorVacation = null;
    if(this.dayfrom == null || this.dayTo == null){
      this.MessageErrorVacation = "Molimo popunite sva polja";
      return;
    }
    let datefrom00 = new Date(this.dayfrom);
    datefrom00.setHours(0,0,0,0);
    if (datefrom00.getTime() < new Date().getTime()){
      this.MessageErrorVacation = "Neispravan datum";
      return;
    }
    if(new Date(this.dayfrom).getTime() > new Date(this.dayTo).getTime()){
      this.MessageErrorVacation = "Neispravan datum";
      return;
    }
    let datefrom = new Date(this.dayfrom);
    const year = datefrom.getFullYear();
    const month = String(datefrom.getMonth() + 1).padStart(2, '0');
    const day = String(datefrom.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    for(let i of this.AllCheckupsOrdered){
      for(let j=0; j < new Date(this.dayTo).getDate() - new Date(this.dayfrom).getDate() + 1; j++){
        let temp = new Date(formattedDate);
        temp.setDate(temp.getDate() + 1);
        const year1 = temp.getFullYear();
        const month1 = String(temp.getMonth() + 1).padStart(2, '0');
        const day1 = String(temp.getDate()).padStart(2, '0');
        if(i.date == formattedDate){
          this.MessageErrorVacation = "Vec ste zakazali pregled za ovaj dan";
          return;
        }
        formattedDate = `${year1}-${month1}-${day1}`;
      }
      formattedDate = `${year}-${month}-${day}`;
    }
    formattedDate = `${year}-${month}-${day}`;
    for(let j=0; j < new Date(this.dayTo).getDate() - new Date(this.dayfrom).getDate() + 1; j++){
      this.korisnikService.scheduleCheckup("",this.username,formattedDate,"00:00",0,1440,"").subscribe((kor: any) =>{
        this.ngOnInit();
        this.MessageVacation = "Uspesno ste dodali slobodne dane";
      })
      let temp = new Date(formattedDate);
      temp.setDate(temp.getDate() + 1);
      const year1 = temp.getFullYear();
      const month1 = String(temp.getMonth() + 1).padStart(2, '0');
      const day1 = String(temp.getDate()).padStart(2, '0');
      formattedDate = `${year1}-${month1}-${day1}`;
    }
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
