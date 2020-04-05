import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/* Modulos personalizados */
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { InicioModule } from './inicio/inicio.module';
import { RegistroModule } from './registro/registro.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    InicioModule,
    RegistroModule,
    LoginModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
