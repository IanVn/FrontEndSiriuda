import { Component, OnInit, HostListener, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RegistroService } from '../../services/registro/registro.service';
import { FormGroup, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormularioService } from '../../services/registro/formulario.service';
import { ProfesorComponent } from './profesor/profesor.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, AfterViewInit, OnDestroy {

  // Variable para almacenar las subscripciones
  Subscripciones: Array <Subscription> = [];

  // Variable para almacenar el valor del scroll
  Scroll: boolean;

  // Fecha de inicio para el calendario, se representa por el año, el mes que en este caso es 0 que es enero, y el dia que es primero
  startDate = new Date(1980, 0, 1);

  // Atributo que permite ver u ocultar la contraseña
  hide = true;

  // Variable para almacenar los formularios
  formulario: FormGroup;

  // Expresion regular para el CURP
  formato = new RegExp('^[A-Z]{4}\\d{6}([A-Z]{6})\\d{2}$', 'i');

  // Variable para almacenar el observable que regresa el servicio que hace la peticion para obtener los tipos
  Tipo: Observable <any>;

  // Variable para almacenar las diferentes opciones para los tipos
  OpcionTipo: number = 0;

  // Variable para almacenar la referencia de que si el form array tenga elementos o no
  ExisteArray: boolean = false;

  // Inyectamos el servicio de Registro, el servicio de form builder
  // tslint:disable-next-line: max-line-length
  constructor( private Registro: RegistroService, private fb: FormBuilder, private Formulario: FormularioService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.CrearFormulario();
  }

  ngAfterViewInit(): void {
    this.ExisteCurpBD();
    this.ExisteCorreo();
    this.ContrasenasCoinciden();
    this.Tipo = this.Registro.Tipos();
    this.ObservaFormulario();
    this.ObservaTipo();
  }

  ngOnDestroy(){
    // Cuando nos cambiamos de componentes solo quitamos la subscripcion
    this.Subscripciones.forEach( subscripciones => {
      subscripciones.unsubscribe();
    });
  }


  // Host Listener, con esto escuchamos el evento de scroll
  @HostListener('window:scroll', ['$event'])
  EscucharScroll($event: Event) {
    let valorScroll = ($event.target as HTMLDocument).children[0].scrollTop;
    if ( valorScroll > 200 ) {
      this.Scroll = true;
    } else {
      this.Scroll = false;
    }
  }

  // Funcion que permite acceder a los controles del formulario
  get f(){
    return this.formulario.controls;
  }

  // Funcion que permite acceder al control del Form Array
  get array() {
    return this.f.Usuario as FormArray;
  }

  // Funcion que obtiene los controles del form array para hacer la insercion de elementos
  get arrayControls(){
    return this.array?.controls[0] as FormGroup;
  }

  // Funcion que crear el formulario
  CrearFormulario(){
    // En el metodo group creamos un objeto con los campos que van a formar parte del formulario
    this.formulario = this.fb.group( {
      curp: [null, [Validators.required, Validators.pattern(this.formato)]],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      fecha_nacimiento: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.email]],
      genero: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, Validators.required],
      tipoUsuario: [null, [Validators.required]],
      Confirmacion: [false, [Validators.required]],
      Usuario: new FormArray([ ], Validators.required)
    });
  }

  // Funcion que permite verificar que el curp no exista en la base de datos
  ExisteCurpBD(){
    this.Subscripciones.push (
    this.f.curp.valueChanges.pipe(
      filter( data => this.f.curp.valid ),
      switchMap( data => this.Registro.ExisteCurp( data ))
    ).subscribe( (data: boolean) => {
      // Si la data es true entonces quiere decir que el curp no esta registrado,
      // en caso contrario el curp ya esta registrado
      if ( !data ) {
        // Borramos los errores al control curp y agregamos el error llamado ExisteCurp con valor true, 
        // este error es un objeto con la propiedad true, esta propiedad true va a ser verificada mediante
        // el metodo hasError el cual va a devolver true si existe el error y su propiedad es true, si fuera
        // false entonces tendriamos que negar el valor de hasError
        this.f.curp.setErrors( { ExisteCurp: true } );
      } else {
        // En caso de que no exista el curp deshabilitamos los validadores
        this.f.curp.setErrors( null );
      }
    } ));
  }

  // Funcion que permite verificar que el correo no exista en la BD
  ExisteCorreo(){
    this.Subscripciones.push (
    this.f.correo.valueChanges.pipe(
      filter( data => this.f.correo.valid ),
      switchMap( data => this.Registro.ExisteCorreo( data ) )
    ).subscribe( (data: boolean) => {
      // Si el correo ya existe entonces creo el validador
      if ( !data ) {
        this.f.correo.setErrors({ ExisteCorreo: true });
      } else {
        // Si no existe error, es decir que el correo no existe y obtenemos un true entonces desactivamos los errores
        this.f.correo.setErrors( null );
      }
    }));
  }

  // Funcion para verificar que las contraseñas coincidan
  ContrasenasCoinciden(){
    this.Subscripciones.push ( this.f.confirm_password.valueChanges.pipe(
      filter ( data => data !== this.f.password.value && this.f.confirm_password.valid )
    ).subscribe( data => {
      if( data ){
        this.f.confirm_password.setErrors( { SonDiferentes: true } );
      } else {
        this.f.confirm_password.setErrors( null );
      }
    }));
  }

  // Obtener los errores que pueden tener el curp
  ErroresCurp() {
    return this.f.curp.hasError('required') ? 'Este campo es obligatorio' :
    this.f.curp.hasError('pattern') ? 'El curp no cumple con el formato adecuado' :
    this.f.curp.hasError('ExisteCurp') ? 'El curp ya esta registrado en el sistema' : '';
  }

  // Obtener los errores que pueden tener el correo
  ErroresCorreo(){
    return this.f.correo.hasError('required') ? 'Este campo es obligatorio': 
    this.f.correo.hasError('email') ? 'Debe de escribir un correo válido': 
    this.f.correo.hasError('ExisteCorreo') ? 'Este correo ya esta registrado': '';
  }

  // Obtener los errores de la contraseña
  ErroresContrasenia(){
    return this.f.confirm_password.hasError('required') ? 'Este es un campo obligarior' :
    this.f.confirm_password.hasError('SonDiferentes') ? 'Las contraseñas no coinciden' : '';
  }

  
  // Funcion que observa los cambios del valor del tipo de usuario y de acuerdo con esto se renderizan los componentes
  ObservaTipo(){
    this.Subscripciones.push(
      this.f.tipoUsuario.valueChanges.subscribe( opcion => {
      // Cambiamos la variable de la opcion por el valor que se esta emitiendo, entonces de acuerdo a este valor se renderiza el componente
      // cuando cambiamos de opcion tenemos que limpiar el form array ya que si no lo hacemos se mantiene el valor del array emitido 
      // console.log('Imprimiendo valor del tipo de usuario. Agregando usuario', opcion);
      this.OpcionTipo = opcion;
      this.array.clear();
      this.AgregaFormulario( opcion );
    }));
  }

  ObservaOpcion(): Subscription {
    const ControlEscuela = this.arrayControls?.controls.Escuela;
    const ObservaEscuela = ControlEscuela?.valueChanges.subscribe( data => {
        // console.log('Observando el valor de la escuela', data);
        if( data === 2 ){
          // console.log('Agregando el control del profesor de la FM');
          this.CreaControlesPFM();
          this.Formulario.EmitirBandera(true);
          this.ObservaAsignaturas();
        } else {
          // console.log('Eliminado el control del profesor de la FM');
          this.EliminaControlesFM();
          this.Formulario.EmitirBandera( false );
          this.ObservaAsignaturas()?.unsubscribe();
        }
      });
    return ObservaEscuela;
  }

  ObservaAsignaturas(): Subscription {
    const ControlAsignatura = this.arrayControls?.controls.AsignaturaTercerAnio;
    const ObservaAsignaturas = ControlAsignatura?.valueChanges.subscribe( data => {
        // console.log('Ha escogido la materia con numero', data);
        // console.log('Emitiendo la opcion para renderizarla en la vista de profesor');
        this.Formulario.EmitirId( Number(data) );
      });
    return ObservaAsignaturas;
  }

  // Funcion que permite agregar al formulario de Usuario el subformulario de acuerdo a la opcion
  AgregaFormulario( tipo: number ): void {

    switch ( tipo ) {
      case 1:
        this.array.push(
          this.fb.group({
            EstudiosProfesionales: [null, [Validators.required]],
            GradoEstudios: [null, [Validators.required]],
            CargoAcademico: [null, [Validators.required]],
            Nombramiento: [null, [Validators.required]],
            Antiguedad: [null, [Validators.required]],
            Escuela: [null, [Validators.required]],
        }));
        this.ObservaOpcion();
        break;
      default:
        this.ObservaOpcion()?.unsubscribe();
        break;
    }

  }

  // Funcion que agrega los controles al formulario de Academico de la UNAM si se escoge la opcion de
  // que la escuela sea la Facultad de Medicina
  CreaControlesPFM(): void {
    this.arrayControls.addControl('ImparticionClaseFM', this.fb.control(null, [Validators.required]));
    this.arrayControls.addControl('ProgramaAcademicoFM', this.fb.control(null, [Validators.required]));
    this.arrayControls.addControl('DepartamentoAdscripcionFM', this.fb.control(null, [Validators.required]));
    this.arrayControls.addControl('AsignaturaClinica', this.fb.control(null));
    this.arrayControls.addControl('AsignaturaBiomedica', this.fb.control(null));
    this.arrayControls.addControl('AsignaturaSociomedica', this.fb.control(null));
    this.arrayControls.addControl('AsignaturaTercerAnio', this.fb.control(null, [Validators.required]));
    this.arrayControls.addControl('OtraAsignatura', this.fb.control(null));
  }

  // Funcion que elimina los controles en caso de que se escoga un opcion diferente respecto a la escuela
  EliminaControlesFM(): void {
    this.arrayControls.removeControl('ImparticionClaseFM');
    this.arrayControls.removeControl('ProgramaAcademicoFM');
    this.arrayControls.removeControl('DepartamentoAdscripcionFM');
    this.arrayControls.removeControl('AsignaturaClinica');
    this.arrayControls.removeControl('AsignaturaBiomedica');
    this.arrayControls.removeControl('AsignaturaSociomedica');
    this.arrayControls.removeControl('AsignaturaTercerAnio');
    this.arrayControls.removeControl('OtraAsignatura');
  }

  // Funcion de prueba que observalo los valores del formulario
  ObservaFormulario(){
    this.formulario.valueChanges.subscribe( data => {
      console.log(data);
    });
  }


  // Funcion que obtiene los datos del formulario
  RegistroSubmit() {
    if (this.formulario.valid){
      console.log('Formulario Válido', this.formulario);
    }
  }


}
