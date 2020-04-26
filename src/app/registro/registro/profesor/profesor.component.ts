import { Component, OnInit, OnDestroy} from '@angular/core';
import { RegistroService } from '../../../services/registro/registro.service';
import { FormBuilder, FormGroup, FormArray, ControlContainer, Validators } from '@angular/forms';
import { Observable, Subscription} from 'rxjs';
import { FormularioService } from '../../../services/registro/formulario.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent implements OnInit, OnDestroy {

  // Variable para almacenar el subformulario
  profesor: FormGroup;

  // Variable para almacenar los observables
  EstudiosProfesionales: Observable <any>;
  Escuela: Observable <any>;
  GradoEstudio: Observable <any>;
  CargoAcademico: Observable<any>;
  Nombramiento: Observable <any>;
  ImparticionClase: Observable <any>;
  ProgramaAcademico: Observable <any>;
  DepartamentoAdscripcion: Observable <any>;
  AsignaturasClinica: Observable <any>;
  AsignaturasBiomedicas: Observable <any>;
  AsignaturasSociomedicas: Observable <any>;

  // Variable que almacena true si se escoge la FM y false en caso contrario
  OpcionFM: boolean;

  // Variable que almacenar el array de numeros
  Numero: Array <string> = [];

  // Variable para almacenar las subscripciones
  Subscripciones: Array<Subscription> = [];

  // Variable para almacenar la opcion escogida para las asignaturas
  OpcionAsignatura: number;

  bandera: boolean = false;

  id: number;
  // Necesitamos el servicio de registro y los formularios
  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: max-line-length
  constructor( private Registro: RegistroService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.Inicializacion();
    this.ObservaEscuela();
  }

  ngOnDestroy(): void {
    this.Subscripciones.forEach( subscripciones => {
      subscripciones.unsubscribe();
    });
  }

  // Metodo para crear formulario
  CrearFormulario(): FormGroup {
    this.profesor = this.fb.group({
      EstudiosProfesionales: [null, [Validators.required]],
      GradoEstudios: [null, [Validators.required]],
      CargoAcademico: [null, [Validators.required]],
      Nombramiento: [null, [Validators.required]],
      Antiguedad: [null, [Validators.required]],
      Escuela: [null, [Validators.required]],
    });
    return this.profesor;
  }

  // Funcion que asigna las variables a los observables correspondientes para poder visualizar las opciones
  Inicializacion(): void {
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
    this.Escuela = this.Registro.Escuelas();
    this.GradoEstudio = this.Registro.GradosEstudios();
    this.CargoAcademico = this.Registro.CargosAcademicos();
    this.Nombramiento = this.Registro.Nombramientos();
    this.ImparticionClase = this.Registro.Imparticion();
    this.ProgramaAcademico = this.Registro.ProgramasAcademicos();
    this.DepartamentoAdscripcion = this.Registro.DepartamentoAdscripcion();
    this.AsignaturasClinica = this.Registro.AsignaturasClinicas();
    this.AsignaturasBiomedicas = this.Registro.AsignaturasBiomedicas();
    this.AsignaturasSociomedicas = this.Registro.AsignaturasSociomedicas();

    // Ciclo para rellenar el arreglo de los numeros
    for ( let i = 1; i <= 39; i++) {
      this.Numero.push( String(i) );
    }
    this.Numero.unshift('Menos de un año');
    this.Numero.push('40 años o más');
  }

  // Funcion por el cual podemos acceder al control del formulario
  get f() {
    return this.profesor.controls;
  }

  get Profesor() {
    return (this.f.ProfesorFM as FormGroup)?.controls;
  }

  // Funcion para observar los cambios de la escuela, cuando se selecciona la opcion de la FM
  // Se agregan nuevos controles
  ObservaEscuela(){
    const Escuela = this.f.Escuela.valueChanges.subscribe( data => {
      // Si el dato es igual a 2 entonces se agregan los controles, en caso contrario se eliminan
      if ( data === 2 ) {
        // Creo los controles
        this.CreaControlesFM();
        // Activo la bandera para que se renderizen los datos
        this.bandera = true;
        // console.log('Controles agregados');
      } else {
        this.EliminaControlesFM();
        this.bandera = false;
        // console.log('Controles eliminados');
      }
      console.log(this.profesor);
    });
    return Escuela;
  }

  // Funcion que agrega los controles al formulario de Academico de la UNAM si se escoge la opcion de
  // que la escuela sea la Facultad de Medicina
  CreaControlesFM(): void {
    this.profesor.addControl('ProfesorFM', this.fb.group({
      ImparticionClase: [null, [Validators.required]],
      ProgramaAcademico: [null, [Validators.required]],
      DepartamentoAdscripcion: [null, [Validators.required]],
      AsignaturaTercerAnio: [null, [Validators.required]],
      AsignaturaClinica: [null],
      AsignaturaBiomedica: [null],
      AsignaturaSociomedica: [null],
      OtraAsignatura: [null]
    }));
    this.ObservaAsignaturas();
  }

  // Funcion que elimina los controles en caso de que se escoga un opcion diferente respecto a la escuela
  EliminaControlesFM(): void {
    this.profesor.removeControl('ProfesorFM');
    this.ObservaAsignaturas().unsubscribe();
  }

  // Funcion para observar las asignaturas
  ObservaAsignaturas(){
    const Asignatura = this.Profesor.AsignaturaTercerAnio.valueChanges.subscribe( id => this.id = Number(id) );
    return Asignatura;
  }


}
