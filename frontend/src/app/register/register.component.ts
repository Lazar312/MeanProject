import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Rejected } from '../Rejected';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private KorisnikService:KorisnikService, private http:HttpClient, private router:Router) { }
  username: string;
  password: string;
  confirmPassword: string;
  Message: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  adress: string;
  MessageError: string;
  ImageMessageError: string;
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  ImageBuffer: Buffer;
  AllKorisnik: Korisnik[] = [];
  MessageUsername: string;
  MessagePassword: string;
  MessageConfirmPassword: string;
  MessageEmail: string;
  MessagePhone: string;
  AllRequests: Korisnik[] = [];
  AllRejections: Rejected[] = [];
  ngOnInit(): void {
    this.KorisnikService.getAllKorisnik().subscribe((kor: Korisnik[]) =>{
      this.AllKorisnik = kor;
    })
    this.KorisnikService.getAllRequests().subscribe((kor: Korisnik[]) =>{
      this.AllRequests = kor;
    })
    this.KorisnikService.getRejected().subscribe((kor: Rejected[]) =>{
      this.AllRejections = kor;
    })
    this.http.get('assets/download.png', { responseType: 'arraybuffer' }).subscribe(data => {
      this.ImageBuffer = data as Buffer;
      this.imageName = "download.png";
    });
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
      var reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = () => {
        this.ImageBuffer = reader.result as Buffer;
      }
    }
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
    for(let i of this.AllRejections){
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
  back(){
    this.router.navigate(['/login']);
  }
  register(){
    this.MessageError = null;
    this.Message = null;
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
    for(let i of this.AllRejections){
      if( i.username == this.username){
        this.MessageUsername = "Korisnicko ime je blokirano";
      }
    }
    if(this.username == null || this.password == null || this.firstname == null || this.lastname == null || 
      this.adress == null || this.phone == null || this.email == null){
      this.MessageError = "Molimo popunite sva polja";
      return;
      }
    if(this.MessageError != null || this.MessageUsername != null || this.MessageEmail != null || this.MessageConfirmPassword != null
      || this.MessagePassword != null || this.MessagePhone){
        this.MessageError = "Neispravni podaci"
        return;
      }
    
    this.KorisnikService.addRequestPatient(this.username,this.password,this.firstname,this.lastname,this.adress,this.phone,this.email,"patient",this.imageName,this.ImageBuffer).subscribe((kor: any) =>{
      if(kor){
        this.Message = "Uspesno ste se registrovali";
        this.ngOnInit();
      }else
        this.MessageError = "Neispravni podaci";
    }
    )
  }
}
