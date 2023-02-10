import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RncMeuPerfilModalComponent } from './rnc-meu-perfil-modal.component';

describe('RncMeuPerfilModalComponent', () => {
  let component: RncMeuPerfilModalComponent;
  let fixture: ComponentFixture<RncMeuPerfilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RncMeuPerfilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RncMeuPerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
