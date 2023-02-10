import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncFooterComponent } from './rnc-footer.component';

describe('RncFooterComponent', () => {
  let component: RncFooterComponent;
  let fixture: ComponentFixture<RncFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
