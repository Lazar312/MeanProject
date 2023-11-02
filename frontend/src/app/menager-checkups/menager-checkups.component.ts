import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckupRequested } from '../CheckupRequested';
import { KorisnikService } from '../korisnik.service';
import { SelectCheckup } from '../SelectCheckup';
import { Checkup } from '../Checkup';
import { Specialization } from '../Specializations';
import { Korisnik } from '../Korisnik';

@Component({
  selector: 'app-menager-checkups',
  templateUrl: './menager-checkups.component.html',
  styleUrls: ['./menager-checkups.component.css']
})
export class MenagerCheckupsComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  AllCheckupRequested: CheckupRequested[] = [];
  AllCheckup: SelectCheckup[] = [];
  updateCheckup: boolean = false;
  name: string;
  specialization: string;
  price: number;
  duration: number;
  MessageError: string;
  AllSpecialization: Specialization[] = [];
  MessageErrorS: string;
  MessageS: string;
  addS: boolean = false;
  Specialization: string;
  addcheck: boolean = false;
  nameC: string;
  durationC: number;
  priceC: number;
  MessageErrorC: string;
  MessageC: string;
  SpecializationC: string = null;
  username: string;
  AllKorisnik: Korisnik[] = [];
  nameUpdate: string;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username == "null" || this.username == null){
      this.router.navigate(['']);
      localStorage.clear();
      return;
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
      if(!isMenager){
        if(isPatient){
          this.router.navigate(['patient']);
        }else if(isDoctor){
          this.router.navigate(['doctor']);
        }
      }
    })
    this.korisnikService.getCheckupRequested().subscribe((kor: CheckupRequested[]) =>{
      this.AllCheckupRequested = kor;
    })
    this.korisnikService.getAllSelectCheckups().subscribe((kor: SelectCheckup[]) =>{
      this.AllCheckup = kor;
    })
    this.korisnikService.getAllSpecializations().subscribe((kor: Specialization[]) =>{
      this.AllSpecialization = kor;
    })
  }
  addSpecialization(){
    this.MessageErrorS = null;
    for(let i of this.AllSpecialization){
      if(i.specialization == this.Specialization){
        this.MessageErrorS = "Specijalizacija sa ovim imenom vec postoji";
        return;
      }
    }
    if(this.Specialization == null){
      this.MessageErrorS = "Molimo popunite sva polja";
      return;
    }
    this.korisnikService.addSpecialization(this.Specialization).subscribe((kor: Specialization) =>{
      this.ngOnInit();
      this.MessageS = "Uspesno ste dodali specijalizaciju";
      this.Specialization = null;
    })
  }
  addCheckup(){
    this.MessageErrorC = null;
    this.MessageC = null;
    if(this.durationC == null)this.durationC = 30;
    if(this.SpecializationC == null || this.nameC == null || this.priceC == null){
      this.MessageErrorC = "Molimo popunite sva polja";
      return;
    }
    for(let i of this.AllCheckup){
      if(i.name == this.nameC){
        this.MessageErrorC = "Pregled sa ovim imenom vec postoji";
        return;
      }
    }
    this.korisnikService.addSelectCheckups(this.nameC,this.SpecializationC,this.priceC,this.durationC).subscribe((kor: SelectCheckup) =>{
      this.ngOnInit();
      this.nameC = null;
      this.durationC = null;
      this.priceC = null;
      this.MessageErrorC = null;
      this.SpecializationC = null;
      this.MessageC = "Uspesno ste dodali pregled";
    })

  }
  add(){
    this.addS = true;
  }
  addC(){
    this.addcheck = true;
  }
  closeaddC(){
    this.addcheck = false;
    this.nameC = null;
    this.durationC = null;
    this.priceC = null;
    this.MessageErrorC = null;
    this.MessageC = null;
    this.SpecializationC = null;
  }
  closeadd(){
    this.addS = false;
    this.Specialization = null;
    this.MessageErrorS = null;
    this.MessageS = null;
  }
  close(){
    this.updateCheckup = false;
      this.MessageError = null;
      this.specialization = null;
      this.name = null;
      this.price = null;
      this.duration = null;
  }
  back(){
    this.router.navigate(['menager']);
  }
  updateSelectCheckup(){
    if(this.price == null || this.nameUpdate == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
    }
    for(let i of this.AllCheckup){
      if(i.name == this.nameUpdate && this.name != this.nameUpdate){
        this.MessageError = "Pregled sa ovim imenom vec postoji";
        return;
      }
    }
    if(this.duration == null)this.duration = 30;
    
    this.korisnikService.updateSelectCheckup(this.name,this.nameUpdate,this.specialization,
      this.price,this.duration).subscribe((kor: SelectCheckup) =>{
        this.korisnikService.updateCheckup(this.name,this.nameUpdate,this.price,this.duration).subscribe((kor: Checkup) =>{
        })
      var text = "Menager je promenio cenu pregleda " + this.name + " na " + this.price + " dinara";
      for(let i of this.AllKorisnik){
        if(i.type == "patient"){
          this.korisnikService.addNotification(text,i.username,false, new Date().getTime()).subscribe((kor: Korisnik) =>{})
        }
      }
      
      this.ngOnInit();
      this.updateCheckup = false;
      this.MessageError = null;
      this.specialization = null;
      this.name = null;
      this.price = null;
      this.duration = null;
      this.nameUpdate = null;
    })
  }
  update(SelectCheckup: SelectCheckup){
    this.updateCheckup = true;
    this.name = SelectCheckup.name;
    this.specialization = SelectCheckup.specialization;
    this.duration = null;
    this.price = null;
    this.MessageError = null;
  }
  delete(selectCheckup){
    this.korisnikService.deleteSelectCheckup(selectCheckup.name,selectCheckup.specialization).subscribe((kor: SelectCheckup) =>{
      this.korisnikService.deleteCheckupName(selectCheckup.name).subscribe((kor: Checkup) =>{
        this.ngOnInit();
      })
      
    })
  }
  approve(CheckupRequested: CheckupRequested){
    this.korisnikService.addSelectCheckups(CheckupRequested.name,CheckupRequested.specialization,CheckupRequested.price,CheckupRequested.duration).subscribe((kor: SelectCheckup) =>{
      this.korisnikService.deleteCheckupRequested(CheckupRequested.name,CheckupRequested.doctor).subscribe((kor: CheckupRequested) =>{
        this.ngOnInit();
      })
    })
    
  }
  decline(CheckupRequested: CheckupRequested){
    this.korisnikService.deleteCheckupRequested(CheckupRequested.name,CheckupRequested.doctor).subscribe((kor: CheckupRequested) =>{
      this.ngOnInit();
    })
  }
  

}
