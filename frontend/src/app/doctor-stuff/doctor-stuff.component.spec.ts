import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStuffComponent } from './doctor-stuff.component';

describe('DoctorStuffComponent', () => {
  let component: DoctorStuffComponent;
  let fixture: ComponentFixture<DoctorStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStuffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
