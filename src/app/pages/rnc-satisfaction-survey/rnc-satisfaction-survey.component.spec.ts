import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncSatisfactionSurveyComponent } from './rnc-satisfaction-survey.component';

describe('RncSatisfactionSurveyComponent', () => {
  let component: RncSatisfactionSurveyComponent;
  let fixture: ComponentFixture<RncSatisfactionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncSatisfactionSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncSatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
