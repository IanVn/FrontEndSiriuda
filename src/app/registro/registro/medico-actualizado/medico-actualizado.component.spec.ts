import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoActualizadoComponent } from './medico-actualizado.component';

describe('MedicoActualizadoComponent', () => {
  let component: MedicoActualizadoComponent;
  let fixture: ComponentFixture<MedicoActualizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoActualizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoActualizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
