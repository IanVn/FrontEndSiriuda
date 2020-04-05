import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  // Vamos a emitir un formulario
  private formulario = new Subject<FormGroup>();

  // Lo creamos como observable para poder recibir los datos
  formulario$ = this.formulario.asObservable();

  constructor() { }

  EmitirFormulario( formulario: FormGroup ) {
    this.formulario.next( formulario );
  }
}
