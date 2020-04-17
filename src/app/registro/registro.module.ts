import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ServiciosModule } from '../services/servicios.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfesorComponent } from './registro/profesor/profesor.component';
import { AcademicoExternoComponent } from './registro/academico-externo/academico-externo.component';



@NgModule({
  declarations: [RegistroComponent, ProfesorComponent, AcademicoExternoComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ServiciosModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ProfesorComponent, AcademicoExternoComponent]
})
export class RegistroModule { }
