import { Component, OnInit, OnDestroy, AfterViewInit, } from '@angular/core';
import { RegistroService } from '../../../services/registro/registro.service';
import { FormBuilder, FormGroup, FormArray, ControlContainer } from '@angular/forms';
import { Observable, Subscription} from 'rxjs';
import { FormularioService } from '../../../services/registro/formulario.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent implements OnInit, OnDestroy, AfterViewInit {
  
  // Variable para almacenar el subformulario
  profesor: FormGroup;

  public ogFormGroup;

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
  OpcionAsignatura: string;

  bandera: boolean = false;

  id: number;
  // Necesitamos el servicio de registro y los formularios
  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: max-line-length
  constructor( private Registro: RegistroService, private fb: FormBuilder, private Formulario: FormularioService, public controlContainer: ControlContainer ) { }

  ngOnDestroy(): void {
    this.Subscripciones.forEach( subscripciones => {
      subscripciones.unsubscribe();
    });
  }

  ngOnInit(): void {
    // this.CrearFormulario();
    this.Inicializacion();
    // this.EscuelaCambios();
    // this.ObservaAsignaturas();
    this.ogFormGroup = this.controlContainer.control;
    // console.log('Imprimiendo formgroup del hijo', this.ogFormGroup);
    this.RecibeBandera();
    this.RecibeID();
  }

  ngAfterViewInit(): void {
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
  get array(){
    return this.ogFormGroup.controls.Usuario as FormArray;
  }

  get f(){
    return (this.array?.controls[0] as FormGroup).controls;
  }

  // Funcion que se subscribe a para recibir la bandera
  RecibeBandera(){
    this.Subscripciones.push(
      this.Formulario.OnClick$.subscribe( data => this.bandera = data )
    );
  }

  // Funcion que se subscribe para emitir el id de la materia emitida desde el formulario padre, este id permitira renderizar
  // la opcion de las asignaturas
  RecibeID(){
    this.Subscripciones.push(
      this.Formulario.IdMateria$.subscribe( data => this.id = data )
    );
  }

}
