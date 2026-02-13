import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientPicker } from './gradient-picker';

describe('GradientPicker', () => {
  let component: GradientPicker;
  let fixture: ComponentFixture<GradientPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
