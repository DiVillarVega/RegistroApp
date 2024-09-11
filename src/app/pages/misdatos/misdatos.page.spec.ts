import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MisdatosPage } from './misdatos.page';

describe('InicioPage', () => {
  let component: MisdatosPage;
  let fixture: ComponentFixture<MisdatosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisdatosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
