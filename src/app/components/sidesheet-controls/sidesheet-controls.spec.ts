import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesheetControls } from './sidesheet-controls';

describe('SidesheetControls', () => {
  let component: SidesheetControls;
  let fixture: ComponentFixture<SidesheetControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidesheetControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidesheetControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
