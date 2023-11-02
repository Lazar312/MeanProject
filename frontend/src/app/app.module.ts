import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PatientComponent } from './patient/patient.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { SuccsesfullregisterComponent } from './succsesfullregister/succsesfullregister.component';
import { ProfileComponent } from './profile/profile.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { CheckupsComponent } from './checkups/checkups.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { DoctorMainPageComponent } from './doctor-main-page/doctor-main-page.component';
import { DoctorCheckupsComponent } from './doctor-checkups/doctor-checkups.component';
import { DoctorStuffComponent } from './doctor-stuff/doctor-stuff.component';
import { MenagerLoginComponent } from './menager-login/menager-login.component';
import { MenagerComponent } from './menager/menager.component';
import { MenagerKorisniciComponent } from './menager-korisnici/menager-korisnici.component';
import { MenagerCheckupsComponent } from './menager-checkups/menager-checkups.component';
import { MenagerPromotionsComponent } from './menager-promotions/menager-promotions.component';
import { MainComponent } from './main/main.component';
import { RequestsComponent } from './requests/requests.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PatientComponent,
    KorisnikComponent,
    RegisterDoctorComponent,
    SuccsesfullregisterComponent,
    ProfileComponent,
    DoctorsComponent,
    CheckupsComponent,
    NotificationsComponent,
    ChangepassComponent,
    DoctorsPageComponent,
    DoctorMainPageComponent,
    DoctorCheckupsComponent,
    DoctorStuffComponent,
    MenagerLoginComponent,
    MenagerComponent,
    MenagerKorisniciComponent,
    MenagerCheckupsComponent,
    MenagerPromotionsComponent,
    MainComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbCarouselModule,
    FullCalendarModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
