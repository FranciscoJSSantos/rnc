import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeColorComponent } from './shape-color.component';

describe('ShapeColorComponent', () => {
  let component: ShapeColorComponent;
  let fixture: ComponentFixture<ShapeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
