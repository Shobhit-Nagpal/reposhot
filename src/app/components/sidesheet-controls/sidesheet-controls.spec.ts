import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidesheet } from './sidesheet';

describe('Sidesheet', () => {
  let component: Sidesheet;
  let fixture: ComponentFixture<Sidesheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidesheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidesheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
