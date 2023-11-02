import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCheckupsComponent } from './doctor-checkups.component';

describe('DoctorCheckupsComponent', () => {
  let component: DoctorCheckupsComponent;
  let fixture: ComponentFixture<DoctorCheckupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCheckupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCheckupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
