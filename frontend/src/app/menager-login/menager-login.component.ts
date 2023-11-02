import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-menager-login',
  templateUrl: './menager-login.component.html',
  styleUrls: ['./menager-login.component.css']
})
export class MenagerLoginComponent implements OnInit {

  constructor(private router:Router, private KorisnikService:KorisnikService) { }
  username:string;
  password:string;
  Message:string;
  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
  refresh(){
    this.Message = null;
  }
  login(){
    this.KorisnikService.login(this.username,this.password).subscribe((kor: any) =>{
      if(kor){
        if(kor.type == "menager"){
          localStorage.setItem("username",kor.username);
          this.router.navigate(['menager']);
        }else{
          this.Message = "Neispravni podaci";
        }
      }else{
        this.Message = "Neispravni podaci";
      }
    })
  }
}
