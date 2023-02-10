import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncEffectivenessVerificationComponent } from './rnc-effectiveness-verification.component';

describe('RncEffectivenessVerificationComponent', () => {
  let component: RncEffectivenessVerificationComponent;
  let fixture: ComponentFixture<RncEffectivenessVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncEffectivenessVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncEffectivenessVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
