import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncNonConformitiesComponent } from './rnc-non-conformities.component';

describe('RncNonConformitiesComponent', () => {
  let component: RncNonConformitiesComponent;
  let fixture: ComponentFixture<RncNonConformitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncNonConformitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncNonConformitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
