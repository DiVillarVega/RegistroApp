import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const paginaCompleta = document.querySelector('.fade-in');
    if (paginaCompleta) {
      paginaCompleta.classList.add('fade-in');
    }
  }

  // PARA FABIAN

  public ingresarPaginaValidarRespuestaSecreta(): void {

    // Validar que el correo ingresado esté registrado en el sistema
    const usuario = new Usuario();
  
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
  
    if (!usuarioEncontrado) {
      alert('El correo ingresado no está registrado en el sistema.');
      return;
    }  
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: usuarioEncontrado
      }
    };


    const paginaCompleta = document.getElementById('pagina-completa');
    
    if (paginaCompleta) {
      // Añade la clase 'fade-out-down' para desvanecer y mover el contenido hacia abajo
      paginaCompleta.classList.add('fade-out-down');
  
      // Espera a que termine la transición antes de navegar a la siguiente página
      setTimeout(() => {
        this.router.navigate(['/pregunta'], navigationExtras);
      }, 1000); // Ajusta el tiempo para que coincida con la duración de la animación
    } else {
      // Si no existe el elemento 'pagina-completa', simplemente navega sin animación
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
  
  

  //Ir al login sin animación
  // public irAlLogin(): void {
  //   this.router.navigate(['/login']);
  // }

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
