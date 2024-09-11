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
  }


// PARA FABIÁN !!!
//Esto muestra los mensajes que deberían mostrar tus páginas en lugar de los alert

  public validarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      alert('La respuesta es correcta, tu clave es ' + this.usuario.password);
    } else {
      alert('La respuesta es incorrecta');
    }
  }
}
