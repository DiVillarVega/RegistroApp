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
  @ViewChild('titulo',{ read: ElementRef }) itemTitulo!: ElementRef
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

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .keyframes([
          { offset: 0, transform: 'translateX(-100%)', opacity: 0.4 },  // Fuera de la pantalla por la izquierda
          { offset: 0.5, transform: 'translateX(0)', opacity: 1 },      // Completamente visible en el centro
          { offset: 1, transform: 'translateX(100%)', opacity: 0.4 }    // Fuera de la pantalla por la derecha
        ])
        .play();
    }
}
  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
  
}
