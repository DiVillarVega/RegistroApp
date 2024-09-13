import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationState } from 'src/app/model/navigation-state';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        const state = navigation.extras.state as NavigationState;
        this.usuario = state.usuario;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    const paginaCompleta = document.getElementById('pagina-completa');
  
    if (paginaCompleta) {
      paginaCompleta.classList.add('fade-in-up');
  
      // Espera un momento para que se vea la animación
      setTimeout(() => {
        paginaCompleta.classList.add('show');
      }, 50); // Da un pequeño retardo para activar la animación
    }
  }

  //Ir al Login Sin animación
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

// PARA FABIÁN !!!
//Esto muestra los mensajes que deberían mostrar tus páginas en lugar de los alert

  public validarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto']);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
}
