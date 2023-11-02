import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../Korisnik';
import { notification } from '../Notification';
import { ScheduledCheckup } from '../ScheduledCheckup';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }
  username: string;
  AllKorisnik: Korisnik[] = [];
  AllNotifications: notification[] = [];
  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalPages: number;
  AllScheduledCheckups: ScheduledCheckup[] = [];
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
      if(!isPatient){
        if(isDoctor){
          this.router.navigate(['doctor']);
        }else if(isMenager){
          this.router.navigate(['menager']);
        }
      }
      
      this.korisnikService.getAllNotifications().subscribe((kor: notification[]) =>{
        this.AllNotifications = [];
        for(let i of kor){
          if(i.patient == this.username && ((i.timeMiliseconds - new Date().getTime()) <= 0)){
            this.AllNotifications.push(i);
          }
          
        }
        this.totalPages = Math.ceil(this.AllNotifications.length / this.itemsPerPage) == 0? 1 : Math.ceil(this.AllNotifications.length / this.itemsPerPage);
          if(this.totalPages < this.currentPage){
            this.currentPage = this.totalPages;
          }
      })
    })
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.AllNotifications.length / this.itemsPerPage);
  }
  getCurrentPageNotifications() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.AllNotifications.slice(startIndex, endIndex);
  }
  deleteNotification(not: notification){
    this.korisnikService.deleteNotification(not.text,not.patient,not.read,not.timeMiliseconds).subscribe((kor: notification[]) =>{
      this.ngOnInit();
    })
  }
  rowClicked(not: notification){
    this.korisnikService.readNotification(not.text,not.patient,true, not.timeMiliseconds).subscribe((kor: notification[]) =>{
      this.ngOnInit();
    })
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
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
    this.router.navigate(['patient/doctors']);
  }
  notifications(){
  }
  changepass(){
    this.router.navigate(['changepass']);
  }
  changeImage(){
  }
  changeInfo(){
  }
}
