import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  // Variable para almacenar el Icono
  IconoMenu: string = 'menu';

  // Variable para recibir el valor del componente padre, este valor es del tipo boolean, cuando es true entonces
  // se debe habilitar el cambio de estilo del navbar
  @Input() Scroll: boolean = true;


  constructor() {
  }
  ngOnInit(): void {
  }

  cambiarIcono(e: any) {
    if (e._elementRef.nativeElement.innerText === 'menu') {
      this.IconoMenu = 'close';
    } else {
      this.IconoMenu = 'menu';
    }
  }

}


