import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRootCauseAnalysisComponent } from './rnc-root-cause-analysis.component';

describe('RncRootCauseAnalysisComponent', () => {
  let component: RncRootCauseAnalysisComponent;
  let fixture: ComponentFixture<RncRootCauseAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRootCauseAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRootCauseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
