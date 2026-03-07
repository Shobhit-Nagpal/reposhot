import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HueSlider } from './hue-slider';

describe('HueSlider', () => {
  let component: HueSlider;
  let fixture: ComponentFixture<HueSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HueSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HueSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
