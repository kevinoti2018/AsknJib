import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionsComponent } from './myquestions.component';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MyquestionsComponent', () => {
  let component: MyquestionsComponent;
  let fixture: ComponentFixture<MyquestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyquestionsComponent,BrowserAnimationsModule],
      providers:[{provide:ActivatedRoute,useValue:{
        
      }}]
    });
    fixture = TestBed.createComponent(MyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
