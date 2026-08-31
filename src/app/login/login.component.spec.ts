import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './../core/services/login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('deve salvar o token no localStorage após login bem-sucedido', () => {
    service.loginUser({ email: 'teste@teste.com', password: '123456' }).subscribe();

    const req = httpMock.expectOne(r => r.url.endsWith('/login'));
    req.flush({ data: { token: 'abc123', user: { id: '1', name: 'Teste' } } });

    expect(localStorage.getItem('token')).toBe('abc123');
  });

  it('não deve salvar nada se a resposta não tiver token', () => {
    service.loginUser({ email: 'teste@teste.com', password: 'senha-errada' }).subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne(r => r.url.endsWith('/login'));
    req.flush({ message: 'Credenciais inválidas' }, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('token')).toBeNull();
  });
});