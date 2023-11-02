import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerLoginComponent } from './menager-login.component';

describe('MenagerLoginComponent', () => {
  let component: MenagerLoginComponent;
  let fixture: ComponentFixture<MenagerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
