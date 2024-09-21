import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit {
  @ViewChild('titulo',{ read: ElementRef }) itemTitulo!: ElementRef
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController) {

    this.usuario = new Usuario(
    );
    this.usuario.recibirUsuario(activatedRoute, router);

  }
  ngOnInit() {
    if (!this.usuario.asistencia) {
      this.comenzarEscaneoQR();
    } else {
      console.log("Asistencia ya almacenada:", this.usuario.asistencia);
    }
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

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img = context.getImageData(0, 0, w, h);
    let qrCode = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    
    if (qrCode && qrCode.data !== '') {
      console.log("QR Data:", qrCode.data);
      
      this.escaneando = false;
      this.usuario.asistencia = JSON.parse(qrCode.data);  
      console.log("Asistencia:", this.usuario.asistencia);  
      
      this.usuario.navegarEnviandousuario(this.router, '/miclase');
      return true;
    }
    
    return false;
  }
  


  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }
  

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
  

}