import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas } from './canvas';

describe('Canvas', () => {
  let component: Canvas;
  let fixture: ComponentFixture<Canvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Canvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Canvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
