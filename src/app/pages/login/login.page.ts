import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = Usuario.getNewUsuario('', '', '', '', '', '', '', 
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
  }

  public ngOnInit(): void {
    //if (this.usuario.correo !== '') this.ingresar();
  }

  public ingresar(): void {
    if (this.usuario) {

      if(!this.validarUsuario(this.usuario)) return;
      
      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(
        this.usuario.cuenta, this.usuario.password);

      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        setTimeout(() => {
          this.mostrarMensaje('¡Bienvenido(a)!');
          this.usuario.navegarEnviandousuario(this.router, '/inicio'); // Navegamos hacia el Inicio y enviamos la información extra
        }, 300);
      }
    }
  }

  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarUsuario();
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false
    }
    return true;
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  public ingresarPaginaValidarCorreo(): void {
    this.router.navigate(['/correo']);
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

}

