import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { Specialization } from '../Specializations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  images = [
    {name : '../../assets/image1.jpg', caption: 'Mr cool'},
    {name : '../../assets/image2.webp', caption: 'Mr cool'},
    {name : '../../assets/image3.jpg', caption: 'Mr cool'},
    {name : '../../assets/image4.avif', caption: 'Mr cool'},
    {name : '../../assets/image5.jpg', caption: 'Mr cool'},
  ]
  AllSpecializaton: string[] = [];
  SelectedSort: Number = 0;
  AllDoctors: Korisnik[] = [];
  firstnameSort: string
  lastnameSort: string
  SpecializationSort: string
  firstnameSearch: string
  lastnameSearch: string
  SpecializationSearch: string
  WorksAtSearch: string
  SelectedSearch: Number = 0;
  numofDoctors: number;
  constructor(private router:Router,private korisnikService:KorisnikService,private dom:DomSanitizer) { }
  
  ngOnInit(): void {
    this.slides[0] = {
      src: '../../assets/photo-1538108149393-fbbd81895907.jpeg',
    };
    this.slides[1] = {
      src: '../../assets/istockphoto-1294129593-612x612.jpg',
    }
    this.slides[2] = {
      src: '../../assets/istockphoto-1294129593-612x612.jpg',
    }
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
      this.numofDoctors = this.AllDoctors.length;
      for(let i of this.AllDoctors){
        if(!this.AllSpecializaton.includes(i.Specialization)){
          this.AllSpecializaton.push(i.Specialization);
        }
      }
    })
  }
  go(firstname){
    this.router.navigate(['doctors/'+firstname]);
  }
  login(){

    this.router.navigate(['login']);
  }
  profile(){
    this.router.navigate(['patient']);
  }
  checkup(){
    this.router.navigate(['patient/checkups']);
  }
  things(){
  }
  doctors(){
    // this.router.navigate(['patient/doctors']);
  }
  notifications(){
    this.router.navigate(['patient/notifications']);
  }
  changepass(){
    this.router.navigate(['changepass']);
  }
  changeImage(){
  }
  changeInfo(){
  }
  display(imageBuff){
    const uint8Array = new Uint8Array(Buffer.from(imageBuff));
      const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      const unsafeURL = URL.createObjectURL(blob);
      return this.dom.bypassSecurityTrustUrl(unsafeURL);
  }
  sort(){
    if(this.SelectedSort == 1){
      this.AllDoctors.sort((a, b) => (a.firstname >= b.firstname) ? 1 : -1)
    }else if(this.SelectedSort == 2){
      this.AllDoctors.sort((a, b) => (a.firstname <= b.firstname) ? 1 : -1)
    }else if(this.SelectedSort == 3){
      this.AllDoctors.sort((a, b) => (a.lastname >= b.lastname) ? 1 : -1)
    }else if(this.SelectedSort == 4){
      this.AllDoctors.sort((a, b) => (a.lastname <= b.lastname) ? 1 : -1)
    }else if(this.SelectedSort == 5){
      this.AllDoctors.sort((a, b) => (a.Specialization >= b.Specialization) ? 1 : -1)
    }else if(this.SelectedSort == 6){
      this.AllDoctors.sort((a, b) => (a.Specialization <= b.Specialization) ? 1 : -1)
    }
  }
  search(){
    this.korisnikService.getAllDoctors().subscribe((kor: Korisnik[]) =>{
      this.AllDoctors = kor;
      if(this.firstnameSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.firstname.toLocaleLowerCase().match(this.firstnameSearch.toLocaleLowerCase());
        })
      }if(this.lastnameSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.lastname.toLocaleLowerCase().match(this.lastnameSearch.toLocaleLowerCase());
        })
      }if(this.SpecializationSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.Specialization.toLocaleLowerCase().match(this.SpecializationSearch.toLocaleLowerCase());
        })
      }if(this.WorksAtSearch){
        this.AllDoctors = this.AllDoctors.filter(res =>{
          return res.WorksAt.toLocaleLowerCase().match(this.WorksAtSearch.toLocaleLowerCase());
        })
      }
    
  })
}

}




