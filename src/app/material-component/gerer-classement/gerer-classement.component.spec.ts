import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererClassementComponent } from './gerer-classement.component';

describe('GererClassementComponent', () => {
  let component: GererClassementComponent;
  let fixture: ComponentFixture<GererClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererClassementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
