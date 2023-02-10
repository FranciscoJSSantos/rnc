import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRegisteredNonConformitiesComponent } from './rnc-registered-non-conformities.component';

describe('RncRegisteredNonConformitiesComponent', () => {
  let component: RncRegisteredNonConformitiesComponent;
  let fixture: ComponentFixture<RncRegisteredNonConformitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRegisteredNonConformitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRegisteredNonConformitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
