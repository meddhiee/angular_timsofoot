import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererJoueurComponent } from './gerer-joueur.component';

describe('GererJoueurComponent', () => {
  let component: GererJoueurComponent;
  let fixture: ComponentFixture<GererJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
