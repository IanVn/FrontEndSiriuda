import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegistroService } from '../../../services/registro/registro.service';

@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['../profesor/profesor.component.scss']
})
export class AspiranteComponent implements OnInit, OnDestroy{

  // Variable para almacenar el formulario
  Aspirante: FormGroup;

  // Variables para almacenar los datos de los observables
  GradoEstudios: Observable <any>;
  EstudiosProfesionales: Observable <any>;
  ProgramaAcademico: Observable <any>;
  DepartamentoAdscripcion: Observable <any>;

  // Arreglo para almacenar los años de experiencia
  AniosExperiencia: Array <string> = [];

  // Opcion
  opcion: number = 0;

  // Inyectamos el servicio para crear formularios, para obtener los datos del backend
  constructor( private fb: FormBuilder, private Registro: RegistroService) { }

  ngOnInit(): void {
    // Inicializacion de los observables
    this.Inicializacion();
    this.ObservaLicenciatura();
  }

  ngOnDestroy(): void {
    this.ObservaLicenciatura().unsubscribe();
  }


  // Metodo para la creacion del formulario
  CrearFormulario(): FormGroup {
    this.Aspirante = this.fb.group({
      GradoEstudios: [null, [Validators.required]],
      EstudiosProfesionales: [null, [Validators.required]],
      ProgramaAcademico: [null, [Validators.required]],
      DepartamentoAdscripcion: [null, [Validators.required]],
      TiempoExperiencia: [null, [Validators.required]]
    });
    return this.Aspirante;
  }

  // Metodo para inicializar los observables y asi usarlos en la vista
  Inicializacion(): void {
    this.GradoEstudios = this.Registro.GradosEstudios();
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
    this.ProgramaAcademico = this.Registro.ProgramasAcademicos();
    this.DepartamentoAdscripcion = this.Registro.DepartamentoAdscripcion();
    // Llenado del array
    for ( let i = 1; i <= 39; i++) {
      this.AniosExperiencia.push( String(i) );
    }
    this.AniosExperiencia.unshift('Menos de un año');
    this.AniosExperiencia.unshift('No he sido docente');
    this.AniosExperiencia.push('40 años o más');
  }

  // Metodo para obtener los controles del formulario
  get f(){
    return this.Aspirante.controls;
  }

  ObservaLicenciatura(): Subscription {
    const ProgramaAcademico = this.f.ProgramaAcademico.valueChanges
    .subscribe( data => {
      this.opcion = Number(data);
      // Si se escoge la opcion 7 entonces creamos un nuevo control sino lo removemos
      if ( this.opcion === 7 ){
        this.Aspirante.addControl('LicenciaturaAspiracion', this.fb.control(null,[Validators.required]));
      } else {
        this.Aspirante.removeControl('LicenciaturaAspiracion');
      }
    });
    return ProgramaAcademico;
  }



}
