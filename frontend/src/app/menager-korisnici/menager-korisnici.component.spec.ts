import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerKorisniciComponent } from './menager-korisnici.component';

describe('MenagerKorisniciComponent', () => {
  let component: MenagerKorisniciComponent;
  let fixture: ComponentFixture<MenagerKorisniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerKorisniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerKorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
