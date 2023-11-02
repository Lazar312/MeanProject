import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerPromotionsComponent } from './menager-promotions.component';

describe('MenagerPromotionsComponent', () => {
  let component: MenagerPromotionsComponent;
  let fixture: ComponentFixture<MenagerPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
