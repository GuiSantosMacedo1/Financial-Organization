import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoUsuarioComponent } from './novo-usuario.component';
import { LoginService } from '../../core/services/login.service';

describe('NovoUsuarioComponent', () => {
  let component: NovoUsuarioComponent;
  let fixture: ComponentFixture<NovoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoUsuarioComponent], 
      providers: [{
        provide: LoginService,
        useValue: {
          createUser: () => {},
          notifyUserCreated: () => {}
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
