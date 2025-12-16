import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubForm } from './github-form';

describe('GithubForm', () => {
  let component: GithubForm;
  let fixture: ComponentFixture<GithubForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
