import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererNouveauteComponent } from './gerer-nouveaute.component';

describe('GererNouveauteComponent', () => {
  let component: GererNouveauteComponent;
  let fixture: ComponentFixture<GererNouveauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererNouveauteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererNouveauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
