import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from '../../../services/registro/registro.service';
import { Observable, Subscription } from 'rxjs';

// Interfaz para la creacion de valores
interface Semestre {
  semestre: string;
}

interface Programa{
  programa: string;
  semestre: Semestre[];
}

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['../profesor/profesor.component.scss'],
})
export class InstructorComponent implements OnInit, OnDestroy {

  // variable para almacenar el formulario
  Instructor: FormGroup;

  // Variables para inicializar los datos
  ProgramaAcademico: Observable <any>;
  DepartamentoAdscripcion: Observable <any>;

  // Arreglo
  Semestre: any;

  // Arreglo para almacenar los programas junto con los semestres
  Programa: Programa[];

  // Variable para hacer visible las opciones
  Visible: boolean = false;

  // Inyeccion del servicio de formulario y de Registro
  constructor( private fb: FormBuilder, private Registro: RegistroService) { }

  ngOnInit(): void {
    this.Inicializacion();
    this.ObservaPrograma();
    this.ObservaDepartamento();
  }

  ngOnDestroy(): void {
    this.ObservaPrograma().unsubscribe();
    this.ObservaDepartamento().unsubscribe();
  }

  // Crear Formulario
  CrearFormulario(): FormGroup {
    this.Instructor = this.fb.group({
      ProgramaAcademico: [null, [Validators.required]],
      Programa: [null, [Validators.required]],
      Semestre: [null, [Validators.required]],
      EsInstructor: [false, [Validators.required]]
    });
    return this.Instructor;
  }

  // Inicializacion
  Inicializacion(){
    this.ProgramaAcademico = this.Registro.ProgramasAcademicos();
    this.DepartamentoAdscripcion = this.Registro.DepartamentoAdscripcion();
    this.Programa = this.ProgramaSemestre();
  }
  // Controles
  get f(){
    return this.Instructor.controls;
  }

  // Observador de cambios de la opcion de Programa, cuando observamos el valor lo comparamos con el elemento
  // del array que contiene los programas/semestres
  ObservaPrograma(): Subscription {
    const Programa = this.f.Programa.valueChanges
    .subscribe( data => {
      if(data){
        this.Semestre = this.Programa.filter( opciones => opciones.programa === data ).map( opciones => opciones.semestre )[0];
        this.Visible = true;
      } else {
        this.Visible = false;
      }
    });
    return Programa;
  }

  ObservaDepartamento(): Subscription{
    const Departamento = this.f.EsInstructor.valueChanges.subscribe( data => {
      // Si es true entonces creamos el control y si es false entonces lo borramos
      if(data){
        this.Instructor.addControl('DepartamentoAdscripcion', this.fb.control(null, [Validators.required]));
      } else {
        this.Instructor.removeControl('DepartamentoAdscripcion');
      }
    });
    return Departamento;
  }

  // Opciones de Año/semestre
  ProgramaSemestre() {
    const Opciones: Programa[] = [
      { programa: 'Médico Cirujano',
        semestre: [
          { semestre: 'Primer Semestre' }, { semestre: 'Segundo Semestre' }, { semestre: 'Tercer Semestre' },
          { semestre: 'Cuarto Semestre' }, { semestre: 'Quinto Semestre' }, { semestre: 'Sexto Semestre' },
          { semestre: 'Septimo Semestre' }, { semestre: 'Octavo Semestre' }, { semestre: 'Noveno Semestre' },
          { semestre: 'Décimo Semestre' }, { semestre: 'Undécimo Semestre' }, { semestre: 'Duodécimo Semestre' },
          { semestre: 'Decimotercer Semestre' }]
      },
      { programa: 'Fisioterapia',
        semestre: [
          { semestre: 'Primer Año' }, { semestre: 'Segundo Año' }, { semestre: 'Tercer Año' },
          { semestre: 'Cuarto Año' }
        ]
      },
      { programa: 'PECEM',
        semestre: [
          { semestre: 'Primer Semestre' }, { semestre: 'Segundo Semestre' }, { semestre: 'Tercer Semestre' },
          { semestre: 'Cuarto Semestre' }, { semestre: 'Quinto Semestre' }, { semestre: 'Sexto Semestre' },
          { semestre: 'Septimo Semestre' }, { semestre: 'Octavo Semestre' }, { semestre: 'Noveno Semestre' },
          { semestre: 'Décimo Semestre' }, { semestre: 'Undécimo Semestre' }, { semestre: 'Duodécimo Semestre' },
          { semestre: 'Decimotercer Semestre' }, { semestre: 'Decimocuarto Semestre' }, { semestre: 'Decimoquinto Semestre' },
          { semestre: 'Decimosexto Semestre'}]
      },
      { programa: 'Ciencia Forense',
        semestre: [
          { semestre: 'Primer Semestre' }, { semestre: 'Segundo Semestre' }, { semestre: 'Tercer Semestre' },
          { semestre: 'Cuarto Semestre' }, { semestre: 'Quinto Semestre' }, { semestre: 'Sexto Semestre' },
          { semestre: 'Septimo Semestre' }, { semestre: 'Octavo Semestre' }, { semestre: 'Noveno Semestre' }]
      },
      { programa: 'Investigación Biomédica Básica',
        semestre: [
          { semestre: 'Primer Semestre' }, { semestre: 'Segundo Semestre' }, { semestre: 'Tercer Semestre' },
          { semestre: 'Cuarto Semestre' }, { semestre: 'Quinto Semestre' }, { semestre: 'Sexto Semestre' },
          { semestre: 'Septimo Semestre' }, { semestre: 'Octavo Semestre' }]
      },
      { programa: 'Neurociencia',
        semestre: [
        { semestre: 'Primer Semestre' }, { semestre: 'Segundo Semestre' }, { semestre: 'Tercer Semestre' },
        { semestre: 'Cuarto Semestre' }, { semestre: 'Quinto Semestre' }, { semestre: 'Sexto Semestre' },
        { semestre: 'Septimo Semestre' }, { semestre: 'Octavo Semestre' }]
      }
    ];
    return Opciones;

  }

}
