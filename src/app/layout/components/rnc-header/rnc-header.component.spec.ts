import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncHeaderComponent } from './rnc-header.component';

describe('RncHeaderComponent', () => {
  let component: RncHeaderComponent;
  let fixture: ComponentFixture<RncHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
