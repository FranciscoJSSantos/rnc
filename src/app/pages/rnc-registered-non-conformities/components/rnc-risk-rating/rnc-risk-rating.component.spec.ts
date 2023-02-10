import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRiskRatingComponent } from './rnc-risk-rating.component';

describe('RncRiskRatingComponent', () => {
  let component: RncRiskRatingComponent;
  let fixture: ComponentFixture<RncRiskRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRiskRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRiskRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
