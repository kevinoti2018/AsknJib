import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProofnumComponent } from './components/proofnum/proofnum.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './components/reset/reset.component';
import { QuestionModule } from './components/questions/question/question.module';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeroComponent,
    FooterComponent,
    LandingComponent,
    TestimonialsComponent,
    ProofnumComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,

   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
