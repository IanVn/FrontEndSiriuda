import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistroService } from '../../../services/registro/registro.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormularioService } from '../../../services/registro/formulario.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
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

  // Variable que almacena true si se escoge la FM y false en caso contrario
  OpcionFM: boolean;

  // Variable que almacenar el array de numeros
  Numero: Array <string> = [];

  // Variable para almacenar las subscripciones
  Subscripciones: Array<Subscription> = [];

  // Necesitamos el servicio de registro y los formularios
  constructor( private Registro: RegistroService, private fb: FormBuilder, private Formulario: FormularioService ) { }

  ngOnDestroy(): void {
    this.Subscripciones.forEach( subscripciones => {
      subscripciones.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.Inicializacion();
    this.CrearFormulario();
    this.EscuelaCambios();
    this.EmitirFormulario();
  }

  CrearFormulario(){
    this.profesor = this.fb.group({
      EstudiosProfesionales: [null, [Validators.required]],
      GradoEstudios: [null, [Validators.required]],
      CargoAcademico: [null, [Validators.required]],
      Nombramiento: [null, [Validators.required]],
      Antiguedad: [null, [Validators.required]],
      Escuela: [null, [Validators.required]],
      // Agregamos un formArray ya que dependiendo de la opcion puede ser vacio o con datos
      profesor_fm: new FormArray([])
    });
  }

  // Funcion que regresa un observable de acuerdo con un parametro
  Inicializacion(): void {
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
    this.Escuela = this.Registro.Escuelas();
    this.GradoEstudio = this.Registro.GradosEstudios();
    this.CargoAcademico = this.Registro.CargosAcademicos();
    this.Nombramiento = this.Registro.Nombramientos();
    this.ImparticionClase = this.Registro.Imparticion();
    this.ProgramaAcademico = this.Registro.ProgramasAcademicos();
    this.DepartamentoAdscripcion = this.Registro.DepartamentoAdscripcion();

    // Ciclo para rellenar el arreglo de los numeros
    for ( let i = 1; i <= 39; i++) {
      this.Numero.push( String(i) );
    }
    this.Numero.unshift('Menos de un año');
    this.Numero.push('40 años o mas');
  }

  // Funcion por el cual podemos acceder al control del formulario
  get f(){
    return this.profesor.controls;
  }

  // Funcion para acceder al control del formArray
  get array() {
    return this.f.profesor_fm as FormArray;
  }

  // Funcion que crea el formulario que contendra el formArray
  InsertarProfesorFM(){
    this.array.push(this.fb.group({
      ImparticionClaseFM: [null, [Validators.required]],
      ProgramaAcademicoFM: [null, [Validators.required]],
      DepartamentoAdscripcionFM: [null, [Validators.required]]
    }));
  }

  // Funcion que permite observar los cambios del atributo de la Escuela o Facultad donde imparte clases
  EscuelaCambios(){
    this.Subscripciones.push(
    this.f.Escuela.valueChanges.subscribe( data => {
        if (data === 2) {
          // Como la opcion de facultad de medicina tiene una opcion 2 entonces establecemos la propiedad opcionFM como true para que se 
          // vea visible los campos del formulario, al mismo tiempo ejecutamos la funcion que agrega un formulario al formarray
          this.OpcionFM = true;
          this.array.clear();
          this.InsertarProfesorFM();
        } else {
          // Cuando se cambia de opcion tenemos que dejar limpio el formulario y no podemos dejar visible los campos del formulario
          this.OpcionFM = false;
          this.array.clear();
        }
      } ));
  }

  // Funcion que verifica el estado del formulario padre, si es valido entonces lo emite hacia el componente padre
  EmitirFormulario() {
    this.Subscripciones.push(
    this.profesor.statusChanges.subscribe( data => {
      console.log(data);
      if (data === 'VALID'){
        // Emitimos el formulario
        this.Formulario.EmitirFormulario( this.profesor );
      } else {
        return;
      }
    }));
  }

}
