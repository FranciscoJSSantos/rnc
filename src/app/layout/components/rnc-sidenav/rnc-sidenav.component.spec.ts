import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncSidenavComponent } from './rnc-sidenav.component';

describe('RncSidenavComponent', () => {
  let component: RncSidenavComponent;
  let fixture: ComponentFixture<RncSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
