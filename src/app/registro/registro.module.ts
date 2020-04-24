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
import { AspiranteComponent } from './registro/aspirante/aspirante.component';
import { PosgradoComponent } from './registro/posgrado/posgrado.component';
import { InstructorComponent } from './registro/instructor/instructor.component';
import { MedicoActualizadoComponent } from './registro/medico-actualizado/medico-actualizado.component';
import { PasantesComponent } from './registro/pasantes/pasantes.component';



@NgModule({
  declarations: [
    RegistroComponent, ProfesorComponent, AcademicoExternoComponent,
    AspiranteComponent, PosgradoComponent, InstructorComponent, MedicoActualizadoComponent, PasantesComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ServiciosModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    ProfesorComponent, AcademicoExternoComponent, AspiranteComponent, PosgradoComponent, InstructorComponent,
    MedicoActualizadoComponent, PasantesComponent
  ]
})
export class RegistroModule { }
