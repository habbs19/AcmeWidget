import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './shared/main/main.component';
import { SignupComponent } from './shared/signup/signup.component';
import { ParticipantsComponent } from './shared/participants/participants.component';
import { ActivityformComponent } from './components/activityform/activityform.component';
import { HomeComponent } from './shared/home/home.component';
import { ParticipantCardComponent } from './components/participant-card/participant-card.component';
import { AcmeWidgetInterceptorService } from './core/services/http/acme-widget-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignupComponent,
    ParticipantsComponent,
    ActivityformComponent,
    HomeComponent,
    ParticipantCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AcmeWidgetInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
