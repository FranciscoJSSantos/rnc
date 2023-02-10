import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncModalSatisfactionSurveyComponent } from './rnc-modal-satisfaction-survey.component';

describe('RncModalSatisfactionSurveyComponent', () => {
  let component: RncModalSatisfactionSurveyComponent;
  let fixture: ComponentFixture<RncModalSatisfactionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncModalSatisfactionSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncModalSatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
