import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
