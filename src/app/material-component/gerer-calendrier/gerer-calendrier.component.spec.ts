import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererCalendrierComponent } from './gerer-calendrier.component';

describe('GererCalendrierComponent', () => {
  let component: GererCalendrierComponent;
  let fixture: ComponentFixture<GererCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererCalendrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
