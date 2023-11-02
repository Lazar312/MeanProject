import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Korisnik } from '../Korisnik';
import { KorisnikService } from '../korisnik.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisnikService,private dom: DomSanitizer, private location: Location ) { 

  }
  SelectedSort: Number = 0;
  AllDoctors: Korisnik[] = [];
  firstnameSort: string
  lastnameSort: string
  SpecializationSort: string
  firstnameSearch: string
  lastnameSearch: string
  SpecializationSearch: string
  WorksAtSearch: string
  SelectedSearch: Number = 0;
  username: string;
  AllKorisnik: Korisnik[] = [];
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
      if(!isPatient){
        if(isDoctor){
          this.router.navigate(['doctor']);
        }else if(isMenager){
          this.router.navigate(['menager']);
        }
      }
    })
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
    })
  }
  go(firstname){
    this.router.navigate(['doctors/'+firstname]);
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  profile(){
    this.router.navigate(['patient']);
  }
  checkup(){
    this.router.navigate(['patient/checkups']);
  }
  things(){
  }
  doctors(){
    // this.router.navigate(['patient/doctors']);
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
  display(imageBuff){
    const uint8Array = new Uint8Array(Buffer.from(imageBuff));
      const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      const unsafeURL = URL.createObjectURL(blob);
      return this.dom.bypassSecurityTrustUrl(unsafeURL);
  }
  sort(){
    if(this.SelectedSort == 1){
      this.AllDoctors.sort((a, b) => (a.firstname >= b.firstname) ? 1 : -1)
    }else if(this.SelectedSort == 2){
      this.AllDoctors.sort((a, b) => (a.firstname <= b.firstname) ? 1 : -1)
    }else if(this.SelectedSort == 3){
      this.AllDoctors.sort((a, b) => (a.lastname >= b.lastname) ? 1 : -1)
    }else if(this.SelectedSort == 4){
      this.AllDoctors.sort((a, b) => (a.lastname <= b.lastname) ? 1 : -1)
    }else if(this.SelectedSort == 5){
      this.AllDoctors.sort((a, b) => (a.Specialization >= b.Specialization) ? 1 : -1)
    }else if(this.SelectedSort == 6){
      this.AllDoctors.sort((a, b) => (a.Specialization <= b.Specialization) ? 1 : -1)
    }else if(this.SelectedSort == 7){ 
      this.AllDoctors.sort((a, b) => (a.WorksAt >= b.WorksAt) ? 1 : -1)
    }else if(this.SelectedSort == 8){
      this.AllDoctors.sort((a, b) => (a.WorksAt <= b.WorksAt) ? 1 : -1)
    }
  }
  search(){
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
      if(this.firstnameSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.firstname.toLocaleLowerCase().match(this.firstnameSearch.toLocaleLowerCase());
        })
      }if(this.lastnameSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.lastname.toLocaleLowerCase().match(this.lastnameSearch.toLocaleLowerCase());
        })
      }if(this.SpecializationSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.Specialization.toLocaleLowerCase().match(this.SpecializationSearch.toLocaleLowerCase());
        })
      }if(this.WorksAtSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.WorksAt.toLocaleLowerCase().match(this.WorksAtSearch.toLocaleLowerCase());
        })
      }
    
  })
}
poseti(doc: Korisnik){
  const patient = localStorage.getItem("username");
  localStorage.setItem("username", patient);
  localStorage.setItem("patient", patient);
  localStorage.setItem("usernamed", doc.username);
  localStorage.setItem("firstnamed", doc.firstname);
  localStorage.setItem("lastnamed", doc.lastname);
  localStorage.setItem("specializationd", doc.Specialization);
  localStorage.setItem("worksAtd", doc.WorksAt);
}
}
