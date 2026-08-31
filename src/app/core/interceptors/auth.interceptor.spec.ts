import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('deve adicionar o header Authorization em chamadas /api/ quando há token', () => {
    localStorage.setItem('token', 'meu-token');

    httpClient.get('/api/transactions').subscribe();

    const req = httpMock.expectOne('/api/transactions');
    expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
    req.flush({});
  });

  it('não deve adicionar header em chamadas que não são /api/', () => {
    localStorage.setItem('token', 'meu-token');

    httpClient.get('/assets/config.json').subscribe();

    const req = httpMock.expectOne('/assets/config.json');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('deve limpar o token e redirecionar para /login em erro 401', () => {
    localStorage.setItem('token', 'token-expirado');

    httpClient.get('/api/transactions').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/api/transactions');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});