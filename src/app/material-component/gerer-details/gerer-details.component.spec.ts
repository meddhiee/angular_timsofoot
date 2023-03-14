import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererDetailsComponent } from './gerer-details.component';

describe('GererDetailsComponent', () => {
  let component: GererDetailsComponent;
  let fixture: ComponentFixture<GererDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
