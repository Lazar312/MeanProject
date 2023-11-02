import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../Korisnik';
import { KorisnikService } from '../korisnik.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private korisnikService:KorisnikService,private dom:DomSanitizer, private router:Router) { }
  AllKorisnik: Korisnik[] = [];
  AllDoctors: Korisnik[] = [];
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
  SpecializationDoctor: string;
  WorksAtDoctor: string;
  LotNumDoctor: string;
  username: string;
  Allkor: Korisnik[] = [];
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
    this.korisnikService.getAllRequests().subscribe((kor: Korisnik[]) =>{
      this.AllKOR = kor;
      for(let i of kor){
        if(i.type == 'patient'){
          this.AllKorisnik.push(i);
        }else if (i.type == 'doctor'){
          this.AllDoctors.push(i);;
        }
      }
    })
  }


  display(imageBuff){
    const uint8Array = new Uint8Array(Buffer.from(imageBuff));
      const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      const unsafeURL = URL.createObjectURL(blob);
      return this.dom.bypassSecurityTrustUrl(unsafeURL);
  }

  back(){
    this.router.navigate(['menager/korisnici']);
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
        console.log(this.ImageBufferPatient)
      }
  }

  acceptP(kor: Korisnik){
    this.korisnikService.register(kor.username,kor.password,kor.firstname,kor.lastname,kor.adress,kor.phone,kor.email,"patient",kor.ImageName,kor.ImageBuffer).subscribe((kor1: any) =>{
      if(kor1){
        this.korisnikService.deleteRequest(kor.username).subscribe((kor2: Korisnik[]) =>{
          this.AllKOR = [];
          this.AllKorisnik = [];
          this.AllDoctors = [];
          this.ngOnInit();
        })
      }else
        this.MessageError = "Neispravni podaci";
    })
  }
  rejectP(username){
    this.korisnikService.deleteRequest(username).subscribe((kor1: Korisnik[]) =>{
      this.AllKOR = [];
      this.AllKorisnik = [];
      this.AllDoctors = [];
      this.ngOnInit();
      this.korisnikService.addRejected(username).subscribe((kor2: Korisnik[]) =>{})
    })
  }
  acceptD(kor:Korisnik){
    this.korisnikService.registerDoctor(kor.username,kor.password,kor.firstname,kor.lastname,kor.adress,kor.phone,kor.email,"doctor",kor.lotNum,kor.Specialization,kor.WorksAt,kor.ImageName,kor.ImageBuffer).subscribe((kor1: any) =>{
      if(kor1){
        this.korisnikService.deleteRequest(kor.username).subscribe((kor2: Korisnik[]) =>{
          this.AllKOR = [];
          this.AllKorisnik = [];
          this.AllDoctors = [];
          this.ngOnInit();
        })
      }else
        this.MessageError = "Neispravni podaci";
    })
  }
  rejectD(username){
    this.korisnikService.deleteRequest(username).subscribe((kor1: Korisnik[]) =>{
      this.AllKOR = [];
      this.AllKorisnik = [];
      this.AllDoctors = [];
      this.ngOnInit();
      this.korisnikService.addRejected(username).subscribe((kor2: Korisnik[]) =>{})
    })
  }
  logout(){

  }


}
