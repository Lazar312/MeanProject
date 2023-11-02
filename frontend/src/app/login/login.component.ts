import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private KorisnikService:KorisnikService,private router:Router) { }
  username: string;
  password: string;
  Message: string;

  ngOnInit(): void {
    //localStorage.clear();
    localStorage.clear();
    sessionStorage.clear();
  }
  login(){
    this.KorisnikService.login(this.username,this.password).subscribe((kor: Korisnik) =>{
      if(kor){
        if(kor.type == "patient"){
          localStorage.setItem('username', kor.username); 
          localStorage.setItem('firstname', kor.firstname);
          localStorage.setItem('lastname', kor.lastname);
          localStorage.setItem('adress', kor.adress);
          localStorage.setItem('phone', kor.phone);
          localStorage.setItem('email', kor.email);
          localStorage.setItem('password', kor.password);
          this.router.navigate(['patient']);
        }else if(kor.type == "doctor"){
          localStorage.setItem('username', kor.username); 
          localStorage.setItem('firstname', kor.firstname);
          localStorage.setItem('lastname', kor.lastname);
          localStorage.setItem('adress', kor.adress);
          localStorage.setItem('phone', kor.phone);
          localStorage.setItem('email', kor.email);
          localStorage.setItem('password', kor.password);
          localStorage.setItem('worksAt', kor.WorksAt);
          localStorage.setItem('specialization', kor.Specialization);
          localStorage.setItem('lotNum', kor.lotNum.toString());
          this.router.navigate(['doctor']);
        }else{
          this.Message = "Neispravni podaci";
        }
        

      }else
        this.Message = "Neispravni podaci";
    })
  }
  back(){
    this.router.navigate(['']);
  }
  refresh(){
    this.Message = null;
  }
  register(){
    this.router.navigate(['register']);
  }
}
