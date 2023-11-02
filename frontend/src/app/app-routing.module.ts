import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { RegisterComponent } from './register/register.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { SuccsesfullregisterComponent } from './succsesfullregister/succsesfullregister.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { CheckupsComponent } from './checkups/checkups.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DoctorMainPageComponent } from './doctor-main-page/doctor-main-page.component';
import { DoctorCheckupsComponent } from './doctor-checkups/doctor-checkups.component';
import { DoctorStuffComponent } from './doctor-stuff/doctor-stuff.component';
import { MenagerLoginComponent } from './menager-login/menager-login.component';
import { MenagerComponent } from './menager/menager.component';
import { MenagerCheckupsComponent } from './menager-checkups/menager-checkups.component';
import { MenagerKorisniciComponent } from './menager-korisnici/menager-korisnici.component';
import { MenagerPromotionsComponent } from './menager-promotions/menager-promotions.component';
import { MainComponent } from './main/main.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {path:"", component:MainComponent},
  {path:"login", component:LoginComponent},
  {path:"patient", component:PatientComponent},
  {path:"register", component:RegisterComponent},
  {path:"register/doctor", component:RegisterDoctorComponent},
  {path:"succsesfullregister/:id", component:SuccsesfullregisterComponent},
  {path:"patient/doctors", component:DoctorsComponent},
  {path:"doctors/:firstname", component:DoctorsPageComponent},
  {path:"changepass", component:ChangepassComponent},
  {path:"patient/checkups", component:CheckupsComponent},
  {path:"patient/notifications", component:NotificationsComponent},
  {path:"doctor", component:DoctorMainPageComponent},
  {path:"doctor/checkups", component:DoctorCheckupsComponent},
  {path:"doctor/struff", component:DoctorStuffComponent},
  {path:"menager/login", component:MenagerLoginComponent},
  {path:"menager", component:MenagerComponent},
  {path:"menager/checkups", component:MenagerCheckupsComponent},
  {path:"menager/korisnici", component:MenagerKorisniciComponent},
  {path:"menager/promotion",component:MenagerPromotionsComponent},
  {path:"menager/requests", component:RequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
