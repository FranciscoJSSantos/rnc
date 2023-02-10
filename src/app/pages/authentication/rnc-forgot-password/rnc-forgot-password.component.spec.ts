import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncForgotPasswordComponent } from './rnc-forgot-password.component';

describe('RncForgotPasswordComponent', () => {
  let component: RncForgotPasswordComponent;
  let fixture: ComponentFixture<RncForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
