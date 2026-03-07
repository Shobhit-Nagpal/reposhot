import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerMenu } from './color-picker-menu';

describe('ColorPickerMenu', () => {
  let component: ColorPickerMenu;
  let fixture: ComponentFixture<ColorPickerMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPickerMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
