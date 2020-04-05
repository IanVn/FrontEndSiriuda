import { Component, OnInit, HostListener, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // Variable para almacenar el Icono
  IconoMenu: string = 'menu';

  // Fecha
  fecha = new Date();

  // Variable para almacenar el valor del Scroll que sera pasado al componente hijo
  Scroll: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  cambiarIcono(e: any) {
    if (e._elementRef.nativeElement.innerText === 'menu') {
      this.IconoMenu = 'close';
    } else {
      this.IconoMenu = 'menu';
    }
  }

  // Host Listener, con esto escuchamos el evento de scroll
  @HostListener('window:scroll', ['$event'])
  EscucharScroll($event: Event) {
    let valorScroll = ($event.target as HTMLDocument).children[0].scrollTop;
    if ( valorScroll > 200 ) {
      this.Scroll = true;
    } else {
      this.Scroll = false;
    }

  }
}
