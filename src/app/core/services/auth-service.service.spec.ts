// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorage.clear();
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => localStorage.clear());

  it('isLoggedIn deve ser false sem token', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('isLoggedIn deve ser true com token', () => {
    localStorage.setItem('token', 'abc');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('logout deve remover o token', () => {
    localStorage.setItem('token', 'abc');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('logout não deve apagar o tema salvo', () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('theme', 'dark');
    service.logout();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('logout deve redirecionar para /login sem deixar a tela no histórico', () => {
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { replaceUrl: true });
  });
});