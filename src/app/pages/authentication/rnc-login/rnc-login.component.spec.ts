import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncLoginComponent } from './rnc-login.component';

describe('RncLoginComponent', () => {
  let component: RncLoginComponent;
  let fixture: ComponentFixture<RncLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
