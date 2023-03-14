import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererUtilisateurComponent } from './gerer-utilisateur.component';

describe('GererUtilisateurComponent', () => {
  let component: GererUtilisateurComponent;
  let fixture: ComponentFixture<GererUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
