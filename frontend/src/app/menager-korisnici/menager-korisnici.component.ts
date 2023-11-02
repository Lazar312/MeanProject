import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { Specialization } from '../Specializations';

@Component({
  selector: 'app-menager-korisnici',
  templateUrl: './menager-korisnici.component.html',
  styleUrls: ['./menager-korisnici.component.css']
})
export class MenagerKorisniciComponent implements OnInit {

  constructor(private korisnikService:KorisnikService,private dom:DomSanitizer, private router:Router) { }
  AllKorisnik: Korisnik[] = [];
  AllDoctors: Korisnik[] = [];
  lastSpecialization: string;
  phonePatient: string;
  emailPatient: string;
  firstnamePatient: string;
  lastnamePatient: string;
  adressPatient: string;
  ImageBufferPatient: Buffer;
  ImageNamePatient: string;
  ImageMessageError: string;
  AllKOR: Korisnik[] = [];
  MessageUsername: string;
  MessageEmail: string;
  MessageError: string;
  MessagePhone: string;
  Message: string;
  updatePat: boolean = false;
  usernameToedit: string;
  updateDoc: boolean = false;
  firstnameDoctor: string;
  lastnameDoctor: string;
  adressDoctor: string;
  phoneDoctor: string;
  emailDoctor: string;
  SpecializationDoctor: string = null;
  WorksAtDoctor: string;
  LotNumDoctor: string;
  username: string;
  Allkor: Korisnik[] = [];
  AllSpecializations: Specialization[] = [];
  MessagePhoneDoc: string;
  MessageEmailDoc: string;
  MessageErrorDoc: string;
  MessageDoc: string;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username == "null" || this.username == null){
      this.router.navigate(['']);
      localStorage.clear();
      return;
    }
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.Allkor = kor;
      var isPatient = false;
      var isDoctor = false;
      var isMenager = false;
      for(let i of this.Allkor){
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
    this.korisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKOR = kor;
      for(let i of kor){
        if(i.type == 'patient'){
          this.AllKorisnik.push(i);
        }
      }

    })
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
    })
    this.korisnikService.getAllSpecializations().subscribe((spec: Specialization[]) =>{
      this.AllSpecializations = spec;
    })
  }

  emailBlur(){
    this.MessageEmail = null;
    if(this.emailPatient == null){
      this.MessageEmail = "Molimo unesite email adresu";
      return;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.emailPatient.match(validRegex) == null){
      this.MessageEmail = "Molimo unesite ispravnu email adresu"
      return;
    }
    for(let i of this.AllKOR){
      if( i.email == this.emailPatient && i.username != this.usernameToedit){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
  }
  display(imageBuff){
    const uint8Array = new Uint8Array(Buffer.from(imageBuff));
      const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      const unsafeURL = URL.createObjectURL(blob);
      return this.dom.bypassSecurityTrustUrl(unsafeURL);
  }
  phoneBlur(){
    this.MessagePhone = null;
    if(this.phonePatient == null){
      this.MessagePhone = "Molimo unesite broj telefona";
      return;
    }
    var phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
    if(this.phonePatient.match(phoneRegex) == null || (this.phonePatient.length > 10 || this.phonePatient.length < 8)){
        this.MessagePhone = "Molimo unesite ispravni broj telefona"
        return;
    }

  }
  back(){
    this.router.navigate(['menager']);
  }
  openfile(event){
    this.ImageMessageError = null;
    this.ImageNamePatient = event.target.files[0].name;
    if(this.ImageNamePatient.split(".")[1] != "jpg" && this.ImageNamePatient.split(".")[1] != "png" && this.ImageNamePatient.split(".")[1] != "jpeg"){
      this.ImageMessageError = "Neispravan format slike";
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = () => {  
      const imageHeight = img.height;
      const imageWidth = img.width;
      this.ImageNamePatient = event.target.files[0].name;
      if(imageHeight > 300 || imageWidth > 300 || imageHeight < 100 || imageWidth < 100){
        this.ImageMessageError = "Neispravne dimenzije slike (100x100 - 300x300)";
        return;
      }
    };

    if(this.ImageMessageError != null)return;
    var reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = () => {
        this.ImageBufferPatient = reader.result as Buffer;
      }
  }
  updateD(doc){
    if(this.updatePat)return;
    this.updateDoc=!this.updateDoc;
    if(this.updateDoc){
      this.firstnameDoctor = null;
      this.lastnameDoctor = null;
      this.adressDoctor = null;
      this.phoneDoctor = null;
      this.emailDoctor = null;
      this.SpecializationDoctor = null;
      this.WorksAtDoctor = null;
      this.LotNumDoctor = null;
      this.usernameToedit = doc.username;
      this.lastSpecialization = doc.Specialization;
      this.Message = null;
      this.MessageEmail = null;
      this.MessagePhone = null;
      this.MessageError = null;
      this.ImageMessageError = null;
    }
    else this.usernameToedit = null;
  }
  phoneBlurDoctor(){
    this.MessagePhone = null;
    if(this.phoneDoctor == null){
      this.MessagePhone = "Molimo unesite broj telefona";
      return;
    }
    var phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
    if(this.phoneDoctor.match(phoneRegex) == null || (this.phoneDoctor.length > 10 || this.phoneDoctor.length < 8)){
        this.MessagePhone = "Molimo unesite ispravni broj telefona"
        return;
    }

  }
  emailBlurDoctor(){
    this.MessageEmail = null;
    if(this.emailDoctor == null){
      this.MessageEmail = "Molimo unesite email adresu";
      return;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.emailDoctor.match(validRegex) == null){
      this.MessageEmail = "Molimo unesite ispravnu email adresu"
      return;
    }
    for(let i of this.AllKOR){
      if( i.email == this.emailDoctor && i.username != this.usernameToedit){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
  }
  updateP(korUser){
    if(this.updateDoc)return;
    this.updatePat=!this.updatePat;
    if(this.updatePat){
      this.usernameToedit = korUser;
      this.firstnamePatient = null;
      this.lastnamePatient = null;
      this.adressPatient = null;
      this.phonePatient = null;
      this.emailPatient = null;
      this.ImageBufferPatient = null;
      this.ImageNamePatient = null;
      this.Message = null;
      this.MessageEmail = null;
      this.MessagePhone = null;
      this.MessageError = null;
      this.ImageMessageError = null;
    }
    else this.usernameToedit = null;
  }
  updateDoctor(){
    this.MessageError = null;
    this.Message = null;
    if(this.firstnameDoctor == null || this.lastnameDoctor == null || this.adressDoctor == null || this.phoneDoctor == null || this.emailDoctor == null || this.SpecializationDoctor == null || this.WorksAtDoctor == null || this.LotNumDoctor == null
      || this.ImageBufferPatient == null || this.ImageNamePatient == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
    }
    if(this.MessageError != null || this.MessageUsername != null || this.MessageEmail != null || this.MessagePhone || this.ImageMessageError != null){
      this.MessageError = "Neispravni podaci"
      return;
    }
    this.korisnikService.updateDoctor(this.usernameToedit, this.firstnameDoctor, this.lastnameDoctor, this.phoneDoctor, this.emailDoctor, this.adressDoctor,this.ImageBufferPatient,this.ImageNamePatient, this.WorksAtDoctor, this.SpecializationDoctor, this.LotNumDoctor).subscribe((kor: Korisnik) =>{
      if(this.lastSpecialization != this.SpecializationDoctor){
        this.korisnikService.deleteCheckupDoctor(this.usernameToedit).subscribe(()=>{
        })
      }
      
      this.AllKorisnik = [];
      this.AllDoctors = [];
      this.ngOnInit();
      this.usernameToedit=null
      this.firstnameDoctor = null;
      this.lastnameDoctor = null;
      this.adressDoctor = null;
      this.phoneDoctor = null;
      this.emailDoctor = null;
      this.SpecializationDoctor = null;
      this.WorksAtDoctor = null;
      this.LotNumDoctor = null;
      this.updateDoc = false;
      this.ImageBufferPatient = null;
      this.ImageNamePatient = null;
    })
  }

  updatePatient(){
    this.MessageError = null;
    this.Message = null;

    if( this.firstnamePatient == null || this.lastnamePatient == null || 
      this.adressPatient == null || this.phonePatient == null || this.emailPatient == null || this.ImageBufferPatient == null || this.ImageNamePatient == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
      }
    if(this.MessageError != null || this.MessageUsername != null || this.MessageEmail != null || this.MessagePhone){
        this.MessageError = "Neispravni podaci"
        return;
      }

    this.korisnikService.updatePatient(this.usernameToedit, this.firstnamePatient, this.lastnamePatient, this.adressPatient, this.phonePatient, this.emailPatient, this.ImageBufferPatient, this.ImageNamePatient).subscribe((kor: Korisnik) =>{
      this.AllKorisnik = [];
      this.AllDoctors = [];
      this.ngOnInit();
      this.updatePat = false;
      this.usernameToedit = null;
      this.firstnamePatient = null;
      this.lastnamePatient = null;
      this.adressPatient = null;
      this.phonePatient = null;
      this.emailPatient = null;
      this.ImageBufferPatient = null;
      this.ImageNamePatient = null;
    })
  }
  delete(username){
    this.korisnikService.deleteKorisnik(username).subscribe(()=>{
      this.AllKorisnik = [];
      this.AllDoctors = [];
      this.ngOnInit();
    });
  }
  addDoctor(){
    this.router.navigate(['register/doctor']);
  }
  logout(){

  }
  requests(){
    this.router.navigate(['menager/requests']);
  }
}
