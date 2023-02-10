import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncChartComponent } from './rnc-chart.component';

describe('RncChartComponent', () => {
  let component: RncChartComponent;
  let fixture: ComponentFixture<RncChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
