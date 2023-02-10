import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRegistrationApprovalComponent } from './rnc-registration-approval.component';

describe('RncRegistrationApprovalComponent', () => {
  let component: RncRegistrationApprovalComponent;
  let fixture: ComponentFixture<RncRegistrationApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRegistrationApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRegistrationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
