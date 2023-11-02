import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';

@Component({
  selector: 'app-menager-promotions',
  templateUrl: './menager-promotions.component.html',
  styleUrls: ['./menager-promotions.component.css']
})
export class MenagerPromotionsComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  AllKorisnik: Korisnik[] = [];
  username: string;
  text: string = null;
  Message: string = null;
  MessageError: string = null;
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
  }
  textInput(){
    this.MessageError = null;
    this.Message = null;
  }
  addNotification(){
    this.MessageError = null;
    if(this.Message != null){
      this.Message = null;
      this.MessageError = "Vec ste dodali promociju";
      return;
    }
    if(this.text=="" || this.text==null){
      this.MessageError = "Unesite promociju";
      return;
    }
    for(let i of this.AllKorisnik){
      if(this.MessageError)break;
      if(i.type == "patient"){
        this.korisnikService.addNotification(this.text,i.username,false, new Date().getTime()).subscribe((kor: any) =>{
          if(kor){
            this.Message = "Uspesno ste dodali promociju";
          }else{
            this.MessageError = "Greska pri dodavanju promocije";
          }
        })
      }
    }
  }
  back(){
    this.router.navigate(['menager']);
  }
}
