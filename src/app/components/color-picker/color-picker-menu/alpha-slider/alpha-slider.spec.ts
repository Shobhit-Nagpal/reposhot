import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaSlider } from './alpha-slider';

describe('AlphaSlider', () => {
  let component: AlphaSlider;
  let fixture: ComponentFixture<AlphaSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphaSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
