
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { HeroComponent } from './components/homepage/hero/hero.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LandingComponent } from './components/homepage/landing/landing.component';
import { TestimonialsComponent } from './components/homepage/testimonials/testimonials.component';
import { ProofnumComponent } from './components/homepage/proofnum/proofnum.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionModule } from './components/questions/question/question.module';
import { AdminsModule } from './components/admin/admins/admins.module';
import { QuestionsearchPipe } from './questionsearch.pipe';
import { TagsearchPipe } from './tagsearch.pipe';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { userReducers } from './State/Reducers/userReducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './State/Effects/userEffects';
import { questionsReducer } from './State/Reducers/questionReducers';
import { QuestionEffects } from './State/Effects/questionEffects';
import { AnswerEffects } from './State/Effects/answerEffects';
import { answerReducer } from './State/Reducers/answerReducers';
import { CommentReducer } from './State/Reducers/commentReducer';
import { CommentEffects } from './State/Effects/commentEffects';




@NgModule({
  declarations: [
    AppComponent,
    QuestionsearchPipe,
    TagsearchPipe,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NotfoundComponent,
    QuestionModule,
    AdminsModule,
    AppRoutingModule,
    NavComponent,
    HeroComponent,
    FooterComponent,
    LandingComponent,
    TestimonialsComponent,
    ProofnumComponent,
    StoreModule.forRoot({user:userReducers, question:questionsReducer,answer:answerReducer,comment:CommentReducer}, {}),
    EffectsModule.forRoot([UserEffects,QuestionEffects,AnswerEffects,CommentEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
