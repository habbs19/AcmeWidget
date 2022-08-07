import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MainComponent } from './shared/main/main.component';
import { ParticipantsComponent } from './shared/participants/participants.component';
import { SignupComponent } from './shared/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'signup', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      { path: 'participants', component: ParticipantsComponent },
    ]
  },
  { path: 'participants', component: ParticipantsComponent, outlet: 'form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
