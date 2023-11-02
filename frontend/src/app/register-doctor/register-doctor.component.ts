import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Rejected } from '../Rejected';
import { Specialization } from '../Specializations';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent implements OnInit {

  constructor(private KorisnikService:KorisnikService, private http:HttpClient, private router:Router) { }
  username: string;
  password: string;
  Message: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  adress: string;
  lotNum: number;
  worksAt: string;
  specialization: string = null;
  MessageError: string;
  AllKorisnik: Korisnik[] = [];
  confirmPassword: string;
  ImageMessageError: string;
  ImageBuffer: Buffer;
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  MessageUsername: string;
  MessagePassword: string;
  MessageConfirmPassword: string;
  MessageEmail: string;
  MessagePhone: string;
  AllRequests: Korisnik[] = [];
  ALLRejections: Rejected[] = [];
  MessageErrorlot: string;
  usernameMenager: string;
  AllSpecializations: Specialization[] = [];
  ngOnInit(): void {
    this.usernameMenager = localStorage.getItem('username');
    if(this.usernameMenager == "null" || this.usernameMenager == null){
      this.router.navigate(['']);
      localStorage.clear();
      return;
    }
    this.KorisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
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
    this.KorisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
    })
    this.KorisnikService.getAllRequests().subscribe((kor: Korisnik[]) =>{
      this.AllRequests = kor;
    })
    this.KorisnikService.getRejected().subscribe((kor: Rejected[]) =>{
      this.ALLRejections = kor;
    })
    this.KorisnikService.getAllSpecializations().subscribe((kor: Specialization[]) =>{
      this.AllSpecializations = kor;
    })
    this.http.get('assets/download.png', { responseType: 'arraybuffer' }).subscribe(data => {
      this.ImageBuffer = data as Buffer;
      this.imageName = "download.png";
    });
  }
  usernameBlur(){
    this.MessageUsername = null;
    if(this.username == null){
      this.MessageUsername = "Molimo unesite korisnicko ime";
      return;
    }
    for(let i of this.AllKorisnik){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je zauzeto";
        return;
      }
    }
    for(let i of this.AllRequests){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je zauzeto";
        return;
      }
    }
    for(let i of this.ALLRejections){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je blokirano";
        return;
      }
    }
  }
  passwordBlur(){
    this.MessagePassword = null;
    this.MessageConfirmPassword = null;
    if(this.password == null){
      this.MessagePassword = "Molimo unesite lozinku";
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
    if(this.confirmPassword != this.password){
      this.MessageConfirmPassword = "Lozinke se ne poklapaju";
      return;
    }
  }
  confirmPasswordBlur(){
    this.MessageConfirmPassword = null;
    if(this.confirmPassword == null){
      this.MessageConfirmPassword = "Molimo potvrdite lozinku";
      return;
    }
    if(this.confirmPassword != this.password){
      this.MessageConfirmPassword = "Lozinke se ne poklapaju";
      return;
    }
  }
  emailBlur(){
    this.MessageEmail = null;
    if(this.email == null){
      this.MessageEmail = "Molimo unesite email adresu";
      return;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.email.match(validRegex) == null){
      this.MessageEmail = "Molimo unesite ispravnu email adresu"
      return;
    }
    for(let i of this.AllKorisnik){
      if( i.email == this.email){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
    for(let i of this.AllRequests){
      if( i.email == this.email){
        this.MessageEmail = "Email adresa je zauzeta";
        return;
      }
    }
  }
  phoneBlur(){
    this.MessagePhone = null;
    if(this.phone == null){
      this.MessagePhone = "Molimo unesite broj telefona";
      return;
    }
    var phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
    if(this.phone.match(phoneRegex) == null || (this.phone.length > 10 || this.phone.length < 8)){
        this.MessagePhone = "Molimo unesite ispravni broj telefona"
        return;
    }

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
      if(event.target.files[0] == null)return;
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = () => {
        this.ImageBuffer = reader.result as Buffer;
      }
  }
  register(){
    this.MessageError = null;
    this.Message = null;
    if(this.username == null || this.password == null || this.firstname == null || this.lastname == null || 
      this.adress == null || this.phone == null || this.email == null || this.lotNum == null || this.specialization == null || this.worksAt == null || this.ImageBuffer == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
      }
    for(let i of this.AllKorisnik){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je zauzeto";
      }if(i.email == this.email){
        this.MessageEmail = "Email adresa je zauzeta";
      }
    }
    for(let i of this.AllRequests){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je zauzeto";
      }if(i.email == this.email){
        this.MessageEmail = "Email adresa je zauzeta";
      }
    }
    for(let i of this.ALLRejections){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je blokirano";
      }
    }
    
    if(this.MessageConfirmPassword != null || this.MessageEmail != null || this.MessagePassword != null || this.MessageUsername != null || this.MessagePhone != null || this.ImageMessageError != null){
      this.MessageError = "Molimo unesite ispravne podatke";
      return;
    }
    this.KorisnikService.addRequestDoctor(this.username,this.password,this.firstname,this.lastname,this.adress,this.phone,this.email,"doctor",this.lotNum,this.specialization,this.worksAt, this.imageName, this.ImageBuffer).subscribe((kor: any) =>{
      if(kor){
          this.Message = "Uspesno ste se registrovali";
          this.ngOnInit();
          
      }else
        this.MessageError = "Neispravni podaci";
    }
    )
  }
  back(){
    this.router.navigate(['menager/korisnici']);
  }
}
