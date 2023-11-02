import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccsesfullregisterComponent } from './succsesfullregister.component';

describe('SuccsesfullregisterComponent', () => {
  let component: SuccsesfullregisterComponent;
  let fixture: ComponentFixture<SuccsesfullregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccsesfullregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccsesfullregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
