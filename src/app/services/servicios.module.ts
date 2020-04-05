import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from './registro/registro.service';
import { FormularioService } from './registro/formulario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RegistroService,
    FormularioService
  ]
})
export class ServiciosModule { }
