import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncRegisteredNonConformitiesModalComponent } from './rnc-registered-non-conformities-modal.component';

describe('RncRegisteredNonConformitiesModalComponent', () => {
  let component: RncRegisteredNonConformitiesModalComponent;
  let fixture: ComponentFixture<RncRegisteredNonConformitiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncRegisteredNonConformitiesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncRegisteredNonConformitiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
