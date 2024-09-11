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
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario('','','','','','','',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
  
    const usuarioEncontrado =  usuario.buscarUsuarioPorCorreo(this.correo);
    if (!usuarioEncontrado) {
      alert('El correo ingresado no está registrado en el sistema.');
      return;
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
        this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

}
