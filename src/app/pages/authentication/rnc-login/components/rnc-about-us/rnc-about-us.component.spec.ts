import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncAboutUsComponent } from './rnc-about-us.component';

describe('RncAboutUsComponent', () => {
  let component: RncAboutUsComponent;
  let fixture: ComponentFixture<RncAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncAboutUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
