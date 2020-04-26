import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-pasantes',
  templateUrl: './pasantes.component.html',
  styleUrls: ['../profesor/profesor.component.scss'],
})
export class PasantesComponent implements OnInit, OnDestroy {

  // Para agregar el formulario
  Pasantes: FormGroup;

  // Variables que almacenan los observables para los campos del formulario
  ProgramaAcademico: Observable <any>;
  DepartamentoAdscripcion: Observable <any>;
  Modalidad: Observable <any>;
  Secretarias: Observable<any>;
  
  // Opcion
  opcion: number = 0;

  constructor( private fb: FormBuilder, private Registro: RegistroService ) {}

  ngOnInit(): void {
    this.Inicializacion();
    this.ObservaLicenciatura();
    console.log('OnInit Pasantes', this.Pasantes);
  }

  ngOnDestroy(): void {
    this.ObservaLicenciatura().unsubscribe();
  }


  CrearFormulario(){
    this.Pasantes = this.fb.group({
      ProgramaAcademico: [null, Validators.required],
      DepartamentoAdscripcion: [null, Validators.required],
      Modalidad: [null, Validators.required],
      Secretarias: [null, Validators.required]
    });
    return this.Pasantes;
  }

  Inicializacion(){
    this.ProgramaAcademico = this.Registro.ProgramasAcademicos();
    this.DepartamentoAdscripcion = this.Registro.DepartamentoAdscripcion();
    this.Modalidad = this.Registro.Modalidades();
    this.Secretarias = this.Registro.Secretarias();
  }

  get f(){
    return this.Pasantes.controls;
  }

  ObservaLicenciatura(): Subscription {
    const ProgramaAcademico = this.f.ProgramaAcademico.valueChanges
    .subscribe( data => {
      this.opcion = Number(data);
      // Si se escoge la opcion 7 entonces creamos un nuevo control sino lo removemos
      if ( this.opcion === 7 ){
        this.Pasantes.addControl('OtraLicenciatura', this.fb.control(null,[ Validators.required]));
      } else {
        this.Pasantes.removeControl('OtraLicenciatura');
      }
    });
    return ProgramaAcademico;
  }


}
