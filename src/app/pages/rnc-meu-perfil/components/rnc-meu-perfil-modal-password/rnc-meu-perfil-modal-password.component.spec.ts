import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncMeuPerfilModalPasswordComponent } from './rnc-meu-perfil-modal-password.component';

describe('RncMeuPerfilModalPasswordComponent', () => {
  let component: RncMeuPerfilModalPasswordComponent;
  let fixture: ComponentFixture<RncMeuPerfilModalPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncMeuPerfilModalPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncMeuPerfilModalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
