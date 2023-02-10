import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRegisterComponent } from './rnc-register.component';

describe('RncRegisterComponent', () => {
  let component: RncRegisterComponent;
  let fixture: ComponentFixture<RncRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
