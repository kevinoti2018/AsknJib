import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofnumComponent } from './proofnum.component';

describe('ProofnumComponent', () => {
  let component: ProofnumComponent;
  let fixture: ComponentFixture<ProofnumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProofnumComponent]
    });
    fixture = TestBed.createComponent(ProofnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
