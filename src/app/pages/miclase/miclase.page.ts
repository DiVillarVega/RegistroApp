import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/interfaces/asistencia'; // Importar la interfaz Asistencia

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  public usuario: Usuario;
  public asistencia: Asistencia | undefined;

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
    this.asistencia = this.usuario.asistencia;
    console.log("Asistencia en MiclasePage:", this.asistencia);
  }

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .keyframes([
          { offset: 0, transform: 'translateX(-100%)', opacity: 0.4 }, 
          { offset: 0.5, transform: 'translateX(0)', opacity: 1 },      
          { offset: 1, transform: 'translateX(100%)', opacity: 0.4 }   
        ])
        .play();
    }
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  public desloguear(): void{
    
    this.usuario = new Usuario();
    this.router.navigate(['/login']);
  }
}
