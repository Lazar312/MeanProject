import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService,private dom: DomSanitizer) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username == "null" || this.username == null){
      this.router.navigate(['']);
      localStorage.clear();
      return;
    }
    this.password = localStorage.getItem('password');
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
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
      for(let i of this.AllKorisnik){
        if(i.username == this.username){
          this.kor = i;
          break;
        }
      }
      this.email = this.kor.email;
      this.firstname = this.kor.firstname;
      this.lastname = this.kor.lastname;
      this.adress = this.kor.adress;
      this.phone = this.kor.phone;
      const uint8Array = new Uint8Array(Buffer.from(this.kor.ImageBuffer));
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        const unsafeURL = URL.createObjectURL(blob);
        this.SafeImageUrl = this.dom.bypassSecurityTrustUrl(unsafeURL);
      
    })
    this.korisnikService.getAllRequests().subscribe((kor: Korisnik[]) =>{
      this.AllRequests = kor;
    })
  }
  SafeImageUrl: SafeUrl = null;
  kor: Korisnik;
  AllKorisnik: Korisnik[] = [];
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  adress: string;
  phone: string;
  firstnameUpdate: string;
  lastnameUpdate: string;
  adressUpdate: string;
  phoneUpdate: string;
  emailUpdate: string;
  MessageError: string;
  Message: string;
  MessagePhone: string;
  MessageEmail: string;
  updateinfo: boolean = false;
  ImageMessageError: string;
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  ImageBuffer: Buffer;
  updatepicture: boolean = false;
  AllRequests: Korisnik[] = [];
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  profile(){

  }
  checkup(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    localStorage.setItem('firstname', this.firstname);
    localStorage.setItem('lastname', this.lastname);
    localStorage.setItem('adress', this.adress);
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('email', this.email);
    this.router.navigate(['patient/checkups']);
  }
  things(){
  }
  closeP(){
    this.updatepicture = false;
    this.ImageMessageError = null;
    this.imageName = null;
    this.ImageBuffer = null;
    this.Message = null;
  }
  doctors(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    localStorage.setItem('firstname', this.firstname);
    localStorage.setItem('lastname', this.lastname);
    localStorage.setItem('adress', this.adress);
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('email', this.email);
    this.router.navigate(['patient/doctors']);
  }
  notifications(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    localStorage.setItem('firstname', this.firstname);
    localStorage.setItem('lastname', this.lastname);
    localStorage.setItem('adress', this.adress);
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('email', this.email);
    this.router.navigate(['patient/notifications']);
  }
  changepass(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    this.router.navigate(['changepass']);
  }
  changeImage(){
    this.updatepicture = true;
    
  }
  changeInfo(){
    this.updateinfo = true;
  }
  updatePicture(){
    if(this.ImageMessageError != null)return;
    if(this.imageName == null || this.ImageBuffer == null){
      this.ImageMessageError = "Molimo odaberite sliku";
      return;
    }
    this.korisnikService.updateKorisnikImage(this.username, this.ImageBuffer, this.imageName).subscribe((kor: Korisnik) =>{
      this.ngOnInit();
      this.updatepicture = false;
      this.ImageMessageError = null;
      this.imageName = null;
      this.ImageBuffer = null;
      this.Message = "Uspješno ste promenili sliku";
    })
  }
  updateInfo(){
    this.MessageError = null;
    this.Message = null;
    if(this.MessageError != null || this.MessageEmail != null || this.MessagePhone){
      this.MessageError = "Neispravni podaci"
      return;
    }
    if(this.firstnameUpdate == null)this.firstnameUpdate = this.firstname;
    if(this.lastnameUpdate == null)this.lastnameUpdate = this.lastname;
    if(this.adressUpdate == null)this.adressUpdate = this.adress;
    if(this.phoneUpdate == null)this.phoneUpdate = this.phone;
    if(this.emailUpdate == null)this.emailUpdate = this.email;
    this.korisnikService.updatePatientInfo(this.username, this.firstnameUpdate, this.lastnameUpdate, this.adressUpdate, this.phoneUpdate, this.emailUpdate).subscribe((kor: Korisnik) =>{
      this.firstnameUpdate = null;
      this.lastnameUpdate = null;
      this.adressUpdate = null;
      this.phoneUpdate = null;
      this.emailUpdate = null;
      this.ngOnInit();
      this.Message = "Uspješno ste izmijenili podatke";
    })
  }
  close(){
    this.updateinfo = false;
    this.MessageError = null;
    this.Message = null;
    this.MessagePhone = null;
    this.MessageEmail = null;
    this.firstnameUpdate = null;
    this.lastnameUpdate = null;
    this.adressUpdate = null;
    this.phoneUpdate = null;
    this.emailUpdate = null;
  }
  openfile(event){
    this.ImageMessageError = null;
    this.imageName = event.target.files[0].name;
    if(this.imageName.split(".")[1] != "jpg" && this.imageName.split(".")[1] != "png" && this.imageName.split(".")[1] != "jpeg"){
      this.ImageMessageError = "Neispravan format slike";
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = () => {  
      this.imageHeight = img.height;
      this.imageWidth = img.width;
      if(this.imageHeight > 300 || this.imageWidth > 300 || this.imageHeight < 100 || this.imageWidth < 100){
        this.ImageMessageError = "Neispravne dimenzije slike (100x100 - 300x300)";
        return;
      }
    }
    if(this.ImageMessageError != null)return;
    var reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = () => {
        this.ImageBuffer = reader.result as Buffer;
      }
  }
  
  
  emailBlur(){
    this.MessageEmail = null;
    if(this.emailUpdate == null){
      this.MessageEmail = "Molimo unesite email adresu";
      return;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.emailUpdate.match(validRegex) == null){
      this.MessageEmail = "Molimo unesite ispravnu email adresu"
      return;
    }
    for(let i of this.AllKorisnik){
      if( i.email == this.emailUpdate){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
    for(let i of this.AllRequests){
      if( i.email == this.emailUpdate){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
  }
  phoneBlur(){
    this.MessagePhone = null;
    if(this.phoneUpdate == null){
      this.MessagePhone = "Molimo unesite broj telefona";
      return;
    }
    var phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
    if(this.phoneUpdate.match(phoneRegex) == null || (this.phoneUpdate.length > 10 || this.phoneUpdate.length < 8)){
        this.MessagePhone = "Molimo unesite ispravni broj telefona"
        return;
    }

  }
}
