import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncMeuPerfilComponent } from './rnc-meu-perfil.component';

describe('RncMeuPerfilComponent', () => {
  let component: RncMeuPerfilComponent;
  let fixture: ComponentFixture<RncMeuPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncMeuPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncMeuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
