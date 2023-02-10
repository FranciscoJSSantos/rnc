import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncPlanComponent } from './rnc-plan.component';

describe('RncPlanComponent', () => {
  let component: RncPlanComponent;
  let fixture: ComponentFixture<RncPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
