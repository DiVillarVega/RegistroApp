import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  usuario: any;

  constructor(  private alertController: AlertController,
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  {

    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);

  }
  ngOnInit() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
  
}
