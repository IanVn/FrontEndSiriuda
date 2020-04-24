import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-medico-actualizado',
  templateUrl: './medico-actualizado.component.html',
  styleUrls: ['../profesor/profesor.component.scss'],
})
export class MedicoActualizadoComponent implements OnInit {

  // Para agregar el formulario
  MedicoActualizado: FormGroup;

  // Variables que almacenan los observables para los campos del formulario
  GradoEstudios: Observable <any>;
  EstudiosProfesionales: Observable <any>;

  constructor( private fb: FormBuilder, private Registro: RegistroService ) { }

  ngOnInit(): void {
    this.Inicializacion();
  }

  CrearFormulario() {
    this.MedicoActualizado = this.fb.group({
      GradoEstudios: [null, Validators.required],
      EstudiosProfesionales: [null, Validators.required]
    });
    return this.MedicoActualizado;
  }

  Inicializacion(){
    this.GradoEstudios = this.Registro.GradosEstudios();
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
  }


  get f(){
    return this.MedicoActualizado.controls;
  }



}
