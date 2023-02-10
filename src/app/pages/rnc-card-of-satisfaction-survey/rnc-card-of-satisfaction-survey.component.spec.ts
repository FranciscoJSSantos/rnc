import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncCardOfSatisfactionSurveyComponent } from './rnc-card-of-satisfaction-survey.component';

describe('RncCardOfSatisfactionSurveyComponent', () => {
  let component: RncCardOfSatisfactionSurveyComponent;
  let fixture: ComponentFixture<RncCardOfSatisfactionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncCardOfSatisfactionSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncCardOfSatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
