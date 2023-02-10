import { TestBed } from '@angular/core/testing';
import { SatisfactionSurveyService } from './satisfaction-survey.service';



describe('SatisfactionSurveyService', () => {
  let service: SatisfactionSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatisfactionSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
