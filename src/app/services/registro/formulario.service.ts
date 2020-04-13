import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  // Vamos a emitir un formulario
  private formulario = new Subject<FormGroup>();

  // Emitimos la bandera para cuando se hace click y se solicita el formulario
  private OnClick = new Subject <boolean> ();

  // Emitimos el numero que sera la opcion a habilitar para las materias
  private IdMateria = new Subject <number> ();

  // Lo creamos como observable para poder recibir los datos
  formulario$ = this.formulario.asObservable();
  OnClick$ = this.OnClick.asObservable();
  IdMateria$ = this.IdMateria.asObservable();

  constructor() { }

  EmitirFormulario( formulario: FormGroup ) {
    // console.log('formulario emitido');
    this.formulario.next( formulario );
  }

  EmitirBandera( bandera: boolean ){
    // console.log('Bandera emitida');
    this.OnClick.next(bandera);
  }

  EmitirId( id: number ){
    // console.log('Id emitido');
    this.IdMateria.next( id );
  }
}
