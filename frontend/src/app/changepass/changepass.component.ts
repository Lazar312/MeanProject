import { Component, OnInit } from '@angular/core';
import { Router ,NavigationExtras } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  lastpass: string;
  password: string;
  Message: string;
  passwordConfirm: string;
  username: string;
  correctPassword: string;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username == "null" || this.username == null){
      this.router.navigate(['']);
      localStorage.clear();
    }
    this.correctPassword = localStorage.getItem('password');
    
    localStorage.setItem('password', this.correctPassword);
    localStorage.setItem('username', this.username);

  }
  refresh(){
    this.Message = null;
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  change(){

    if(this.correctPassword != this.lastpass){
      this.Message = "Pogresna lozinka";
      return;
    }
    if(this.password != this.passwordConfirm){
      this.Message = "Lozinke se ne poklapaju";
      return;
    }
    const regex1 = /(.)\1/;
    if(regex1.test(this.password)){
      this.Message = "Lozinka ne sme sadrzati dva ista znaka jedan do drugog"
      return;
      }
    let regex2 =/^[a-zA-Z].*$/
    if(!regex2.test(this.password)){
      this.Message = "Lozinka mora poceti slovom"
      return;
      }
    let regex =/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,14}$/;
    if(this.password.match(regex) == null){
      this.Message = "Lozinka mora biti izmedju 8-14 karektera i sadrzati jedan broj, veliko slovo i specijalan znak"
      return;
      }
    this.korisnikService.changePassword(this.username,this.password).subscribe((kor: string) =>{
      if(kor){
        this.Message = kor;
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['']);
      }else{
        this.Message = "Neispravni podaci";
      }
    })
  }
  back(){
    window.history.back();
  }
}
