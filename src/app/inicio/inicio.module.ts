import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    NgxTypedJsModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports: [
    InicioComponent
  ]
})
export class InicioModule { }
