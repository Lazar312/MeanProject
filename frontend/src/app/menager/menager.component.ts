import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';

@Component({
  selector: 'app-menager',
  templateUrl: './menager.component.html',
  styleUrls: ['./menager.component.css']
})
export class MenagerComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  AllKorisnik: Korisnik[] = [];
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
  username: string;
  logout(){
    this.username = localStorage.getItem('username');
    
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  things(){
  }
  korisnici(){
    this.router.navigate(['menager/korisnici']);
  }
  organize(){
    this.router.navigate(['menager/checkups']);
  }
  notifications(){
  }
  changepass(){
    this.router.navigate(['changepass']);
  }
  changeImage(){
  }
  add(){
    this.router.navigate(['menager/promotion']);
  }
  changeInfo(){
  }
}
