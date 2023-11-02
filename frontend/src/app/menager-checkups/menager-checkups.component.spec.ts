import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerCheckupsComponent } from './menager-checkups.component';

describe('MenagerCheckupsComponent', () => {
  let component: MenagerCheckupsComponent;
  let fixture: ComponentFixture<MenagerCheckupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerCheckupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerCheckupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
