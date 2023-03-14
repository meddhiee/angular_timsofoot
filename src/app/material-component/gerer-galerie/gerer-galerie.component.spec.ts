import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererGalerieComponent } from './gerer-galerie.component';

describe('GererGalerieComponent', () => {
  let component: GererGalerieComponent;
  let fixture: ComponentFixture<GererGalerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererGalerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererGalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
