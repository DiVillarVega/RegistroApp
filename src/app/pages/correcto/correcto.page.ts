import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario | undefined;

  @ViewChild('itemContraseña',{ read: ElementRef }) itemContraseña!: ElementRef
  @ViewChild('page',{ read: ElementRef }) page!: ElementRef


  constructor(private router: Router) { }
  
  

  ngOnInit() {
    // const usuario = new Usuario('','','','','','','',
    //   NivelEducacional.findNivelEducacionalById(1)!, undefined);
  
    // const usuarioEncontrado = usuario.buscarUsuarioPorCorreo2(this.correo);
    //   //el alert debe redirigir al incorrecto
    // }  
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     usuario: usuarioEncontrado
    //   }
    // };
  }
  
  public irAPaginaSiguiente(): void {
    const paginaCompleta = document.getElementById('pagina-completa');
  
    if (paginaCompleta) {
      // Añade la clase 'fade-out' para desvanecer todo el contenido
      paginaCompleta.classList.add('fade-out');
  
      // Navega a la siguiente página después de que termine la transición
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 800); // Ajusta el tiempo para que coincida con la duración de la animación
    }
  }
}
