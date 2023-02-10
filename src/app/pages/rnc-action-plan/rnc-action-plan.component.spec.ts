import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncActionPlanComponent } from './rnc-action-plan.component';

describe('RncActionPlanComponent', () => {
  let component: RncActionPlanComponent;
  let fixture: ComponentFixture<RncActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
