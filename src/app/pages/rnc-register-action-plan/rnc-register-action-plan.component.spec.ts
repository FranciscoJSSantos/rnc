import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRegisterActionPlanComponent } from './rnc-register-action-plan.component';

describe('RncRegisterActionPlanComponent', () => {
  let component: RncRegisterActionPlanComponent;
  let fixture: ComponentFixture<RncRegisterActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRegisterActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRegisterActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
