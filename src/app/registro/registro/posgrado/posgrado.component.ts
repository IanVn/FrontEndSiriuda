import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from '../../../services/registro/registro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posgrado',
  templateUrl: './posgrado.component.html',
  styleUrls: ['../profesor/profesor.component.scss'],
})
export class PosgradoComponent implements OnInit {

  // Variable para almacenar el formulario del estudiante de posgrado
  EstudiantePosgrado: FormGroup;

  // Variables para almacenar los datos de los observables
  GradoEstudios: Observable <any>;
  EstudiosProfesionales: Observable <any>;

  // Inyectamos el servicio de construccion de formulario y el de registro
  constructor( private fb: FormBuilder, private Registro: RegistroService) { }

  ngOnInit(): void {
    this.Inicializacion();
  }

  // Metodo para crear el formulario
  CrearFormulario(): FormGroup {
    this.EstudiantePosgrado = this.fb.group({
      GradoEstudios: [null, [Validators.required]],
      EstudiosProfesionales: [null, [Validators.required]],
      Motivos: [null, [Validators.required]]
    });
    return this.EstudiantePosgrado;
  }

  // Metodo para obtener los controles
  get f(){
    return this.EstudiantePosgrado.controls;
  }

  // Metodo para inicializar las opciones con los observables
  Inicializacion(): void{
    this.GradoEstudios = this.Registro.GradosEstudios();
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
  }

}
