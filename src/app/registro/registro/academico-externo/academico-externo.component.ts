import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from '../../../services/registro/registro.service';

@Component({
  selector: 'app-academico-externo',
  templateUrl: './academico-externo.component.html',
  styleUrls: ['../profesor/profesor.component.scss']
  // styleUrls: ['./academico-externo.component.scss']
})
export class AcademicoExternoComponent implements OnInit {

  // Para agregar el formulario
  AcademicoExterno: FormGroup;
  
  // Variables que almacenan los observables para los campos del formulario
  GradoEstudio: Observable <any>;
  EstudiosProfesionales: Observable <any>;

  // Array que almacenara las opciones de la antiguedad Academica
  // Variable que almacenar el array de numeros
  Numero: Array <string> = [];


  // Inyectamos los servicios de construccion de formulario, y de los resultados de las opciones de los campos 
  constructor( private fb: FormBuilder, private Registro: RegistroService) { }

  ngOnInit(): void {
    this.InicializacionCampos();
  }

  // Funcion que crea el formulario hijo
  CrearFormulario(){
    this.AcademicoExterno = this.fb.group({
      GradoEstudios: [null, [Validators.required]],
      EstudiosProfesionales: [null, [Validators.required]],
      Antiguedad: [null, [Validators.required]],
      NombreInstitucion: [null, [Validators.required]],
      Asignaturas: [null, [Validators.required]]
    });
    return this.AcademicoExterno;
  }

  // Inicializacion de los campos que son asignados a las variables como observables
  InicializacionCampos(){
    this.GradoEstudio = this.Registro.GradosEstudios();
    this.EstudiosProfesionales = this.Registro.EstudiosProfesionales();
    // Ciclo para rellenar el arreglo de los numeros
    for ( let i = 1; i <= 39; i++) {
      this.Numero.push( String(i) );
    }
    this.Numero.unshift('Menos de un año');
    this.Numero.push('40 años o más');
  }

  // Funcion para obtener los controles
  get f(){
    return this.AcademicoExterno.controls;
  }


}
