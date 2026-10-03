import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { TransactionsService } from './transactions.service';
import { environment } from '../../../environments/environments';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/transactions`;

  const transaction = {
    description: 'Mercado',
    amount: 150,
    type: 'expense',
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('deve enviar GET para /transactions', () => {
      service.getTransactions().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');

      req.flush([]);
    });

    it('deve enviar os params como query string', () => {
      service.getTransactions({ month: 10, year: 2026 }).subscribe();

      const req = httpMock.expectOne((r) => r.url === apiUrl);
      expect(req.request.params.get('month')).toBe('10');
      expect(req.request.params.get('year')).toBe('2026');

      req.flush([]);
    });

    it('deve retornar a resposta da API', () => {
      const response = [transaction];
      let result: unknown;

      service.getTransactions().subscribe((res) => (result = res));
      httpMock.expectOne(apiUrl).flush(response);

      expect(result).toEqual(response);
    });

    it('deve enviar Authorization e x-access-token quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.getTransactions().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
      expect(req.request.headers.get('x-access-token')).toBe('meu-token');

      req.flush([]);
    });

    it('não deve enviar headers de autenticação quando não houver token', () => {
      service.getTransactions().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.has('Authorization')).toBeFalse();
      expect(req.request.headers.has('x-access-token')).toBeFalse();

      req.flush([]);
    });

    it('deve manter os params e o header juntos quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.getTransactions({ month: 10 }).subscribe();

      const req = httpMock.expectOne((r) => r.url === apiUrl);
      expect(req.request.params.get('month')).toBe('10');
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');

      req.flush([]);
    });

    it('deve propagar o erro da API', () => {
      let error: any;

      service.getTransactions().subscribe({ error: (e) => (error = e) });

      httpMock
        .expectOne(apiUrl)
        .flush({ message: 'Não autorizado' }, { status: 401, statusText: 'Unauthorized' });

      expect(error.status).toBe(401);
    });
  });

  describe('postTransactions', () => {
    it('deve enviar POST para /transactions com os dados', () => {
      service.postTransactions(transaction).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(transaction);

      req.flush({});
    });

    it('deve enviar Authorization e x-access-token quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.postTransactions(transaction).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
      expect(req.request.headers.get('x-access-token')).toBe('meu-token');

      req.flush({});
    });

    it('não deve enviar headers de autenticação quando não houver token', () => {
      service.postTransactions(transaction).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.has('Authorization')).toBeFalse();
      expect(req.request.headers.has('x-access-token')).toBeFalse();

      req.flush({});
    });
  });

  describe('putTransactions', () => {
    const id = 'abc123';

    it('deve enviar PUT para /transactions/:id com os dados', () => {
      service.putTransactions(id, transaction).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(transaction);

      req.flush({});
    });

    it('deve enviar Authorization e x-access-token quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.putTransactions(id, transaction).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
      expect(req.request.headers.get('x-access-token')).toBe('meu-token');

      req.flush({});
    });

    it('não deve enviar headers de autenticação quando não houver token', () => {
      service.putTransactions(id, transaction).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.has('Authorization')).toBeFalse();
      expect(req.request.headers.has('x-access-token')).toBeFalse();

      req.flush({});
    });

    it('deve propagar o erro quando a transação não existe (404)', () => {
      let error: any;

      service.putTransactions(id, transaction).subscribe({ error: (e) => (error = e) });

      httpMock
        .expectOne(`${apiUrl}/${id}`)
        .flush({ message: 'Não encontrada' }, { status: 404, statusText: 'Not Found' });

      expect(error.status).toBe(404);
    });
  });

  describe('deleteTransactions', () => {
    const id = 'abc123';

    it('deve enviar DELETE para /transactions/:id', () => {
      service.deleteTransactions(id).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');

      req.flush({});
    });

    it('deve enviar Authorization e x-access-token quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.deleteTransactions(id).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
      expect(req.request.headers.get('x-access-token')).toBe('meu-token');

      req.flush({});
    });

    it('não deve enviar headers de autenticação quando não houver token', () => {
      service.deleteTransactions(id).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.has('Authorization')).toBeFalse();
      expect(req.request.headers.has('x-access-token')).toBeFalse();

      req.flush({});
    });
  });

  describe('notifyTransactionsChanged', () => {
    it('deve emitir em transactionsChanged$ quando chamado', () => {
      let emissions = 0;
      service.transactionsChanged$.subscribe(() => emissions++);

      service.notifyTransactionsChanged();

      expect(emissions).toBe(1);
    });

    it('deve emitir uma vez por chamada', () => {
      let emissions = 0;
      service.transactionsChanged$.subscribe(() => emissions++);

      service.notifyTransactionsChanged();
      service.notifyTransactionsChanged();
      service.notifyTransactionsChanged();

      expect(emissions).toBe(3);
    });

    it('não deve emitir nada antes de ser chamado', () => {
      let emissions = 0;
      service.transactionsChanged$.subscribe(() => emissions++);

      expect(emissions).toBe(0);
    });

    it('não deve entregar emissões antigas para quem se inscreve depois (Subject não faz replay)', () => {
      let emissions = 0;

      service.notifyTransactionsChanged();
      service.transactionsChanged$.subscribe(() => emissions++);

      expect(emissions).toBe(0);
    });

    it('deve notificar todos os inscritos', () => {
      let a = 0;
      let b = 0;
      service.transactionsChanged$.subscribe(() => a++);
      service.transactionsChanged$.subscribe(() => b++);

      service.notifyTransactionsChanged();

      expect(a).toBe(1);
      expect(b).toBe(1);
    });
  });
});