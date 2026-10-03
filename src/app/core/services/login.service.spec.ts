// login.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { LoginService, UserCreate } from './login.service';
import { environment } from './../../../environments/environments';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/users`;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('postUser', () => {
    const newUser: UserCreate = {
      name: 'Gui',
      email: 'gui@email.com',
      password: '123456',
    };

    it('deve enviar POST para /users com os dados do usuário', () => {
      service.postUser(newUser).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);

      req.flush({ token: 'abc' });
    });

    it('deve salvar o token quando vier em res.token', () => {
      service.postUser(newUser).subscribe();

      httpMock.expectOne(apiUrl).flush({ token: 'token-direto' });

      expect(localStorage.getItem('token')).toBe('token-direto');
    });

    it('deve salvar o token quando vier em res.data.token', () => {
      service.postUser(newUser).subscribe();

      httpMock.expectOne(apiUrl).flush({ data: { token: 'token-aninhado' } });

      expect(localStorage.getItem('token')).toBe('token-aninhado');
    });

    it('não deve salvar nada quando a resposta não tiver token', () => {
      service.postUser(newUser).subscribe();

      httpMock.expectOne(apiUrl).flush({ user: { name: 'Gui' } });

      expect(localStorage.getItem('token')).toBeNull();
    });

    it('deve retornar a resposta da API para quem se inscreveu', () => {
      const response = { token: 'abc', user: { name: 'Gui' } };
      let result: unknown;

      service.postUser(newUser).subscribe((res) => (result = res));
      httpMock.expectOne(apiUrl).flush(response);

      expect(result).toEqual(response);
    });
  });

  describe('loginUser', () => {
    const credentials = { email: 'gui@email.com', password: '123456' };

    it('deve enviar POST para /users/login com as credenciais', () => {
      service.loginUser(credentials).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);

      req.flush({ token: 'abc' });
    });

    it('deve salvar o token quando vier em res.token', () => {
      service.loginUser(credentials).subscribe();

      httpMock.expectOne(`${apiUrl}/login`).flush({ token: 'token-direto' });

      expect(localStorage.getItem('token')).toBe('token-direto');
    });

    it('deve salvar o token quando vier em res.data.token', () => {
      service.loginUser(credentials).subscribe();

      httpMock
        .expectOne(`${apiUrl}/login`)
        .flush({ data: { token: 'token-aninhado' } });

      expect(localStorage.getItem('token')).toBe('token-aninhado');
    });

    it('não deve salvar nada quando a resposta não tiver token', () => {
      service.loginUser(credentials).subscribe();

      httpMock.expectOne(`${apiUrl}/login`).flush({});

      expect(localStorage.getItem('token')).toBeNull();
    });

    it('deve propagar o erro e não salvar token em caso de 401', () => {
      let error: any;

      service.loginUser(credentials).subscribe({ error: (e) => (error = e) });

      httpMock
        .expectOne(`${apiUrl}/login`)
        .flush({ message: 'Credenciais inválidas' }, { status: 401, statusText: 'Unauthorized' });

      expect(error.status).toBe(401);
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});