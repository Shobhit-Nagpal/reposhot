import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorInputs } from './color-inputs';

describe('ColorInputs', () => {
  let component: ColorInputs;
  let fixture: ComponentFixture<ColorInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
