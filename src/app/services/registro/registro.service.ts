import { Injectable } from '@angular/core';
import { URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  // Inyectamos el servicio para realizar peticiones http
  constructor( public http: HttpClient ) { }

  // Servicio para obtener los estudios profesionales
  EstudiosProfesionales(): Observable <any> {
    let direccion = URL + '/registro/EstudiosProfesionales';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener las escuelas o facultades
  Escuelas(): Observable <any> {
    let direccion = URL + '/registro/Escuelas';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los grados de estudios
  GradosEstudios(): Observable <any> {
    let direccion = URL + '/registro/GradoEstudios';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los cargos academicos
  CargosAcademicos(): Observable <any> {
    let direccion = URL + '/registro/CargoAcademico';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los nombramientos
  Nombramientos(): Observable <any> {
    let direccion = URL + '/registro/Nombramiento';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los lugares de imparticion
  Imparticion(): Observable <any> {
    let direccion = URL + '/registro/imparticion';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los programas academicos
  ProgramasAcademicos(): Observable <any> {
    let direccion = URL + '/registro/ProgramaAcademico';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los departamentos de adscripcion
  DepartamentoAdscripcion(): Observable <any> {
    let direccion = URL + '/registro/DepartamentoAdscripcion';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener las modalidades
  Modalidades(): Observable <any> {
    let direccion = URL + '/registro/modalidad';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener las secretarias
  Secretarias(): Observable <any> {
    let direccion = URL + '/registro/secretarias';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para obtener los tipos de usuarios
  Tipos(): Observable <any> {
    let direccion = URL + '/registro/tipo';
    // Mediante este metodo estamos regresando un objeto JSON
    return this.http.get( direccion ).pipe(
      map( (data: any) => data.datos)
    );
  }

  // Servicio para saber si un curp ya existe
  ExisteCurp( curp: string ){
    let direccion = URL + `/registro/verifica/${curp}`;
    // Hacemos la peticion para verificar el curp
    return this.http.get( direccion ).pipe(
      map( ( data: any ) => data.estado ),
      // Al ejecutarse un codigo de error que viene del backend se rompe el observable, entonces ese error
      // rompe el switchmap ya que este operador necesita dos observables para poder ejecutarse, para solucionarlo
      // convertimos el mensaje de error en un observable
      catchError( data => of( data.error.estado ))
    );
  }

  // Servicio para saber si un correo existe
  ExisteCorreo( correo: string ){
    let direccion = URL + `/registro/verificaCorreo/${correo}`;
    // Hacemos la peticion para verificar el curp
    return this.http.get( direccion ).pipe(
      map( ( data: any ) => data.estado ),
      // Al ejecutarse un codigo de error que viene del backend se rompe el observable, entonces ese error
      // rompe el switchmap ya que este operador necesita dos observables para poder ejecutarse, para solucionarlo
      // convertimos el mensaje de error en un observable
      catchError( data => of( data.error.estado ))
    );
  }

} 
