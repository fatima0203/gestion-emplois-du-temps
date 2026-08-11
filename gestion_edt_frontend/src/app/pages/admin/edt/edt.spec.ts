import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edt  } from './edt';

describe('Edt', () => {
  let component: Edt;
  let fixture: ComponentFixture<Edt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Edt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
