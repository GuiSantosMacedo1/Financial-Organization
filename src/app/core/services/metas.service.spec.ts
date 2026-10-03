// metas.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { MetasService, MetasCreate, MetasResponse } from './metas.service';
import { environment } from '../../../environments/environments'; // ajuste o caminho

describe('MetasService', () => {
  let service: MetasService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/metas`;

  const meta: MetasCreate = {
    title: 'Viagem',
    description: 'Juntar para a viagem de fim de ano',
    amount: 5000,
    amountSaved: 1200,
    saved: false,
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MetasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getMetas', () => {
    it('deve enviar GET para /metas', () => {
      service.getMetas().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');

      req.flush({ data: [] });
    });

    it('deve retornar a lista de metas da API', () => {
      const response: MetasResponse<MetasCreate[]> = { data: [meta] };
      let result: MetasResponse<MetasCreate[]> | undefined;

      service.getMetas().subscribe((res) => (result = res));
      httpMock.expectOne(apiUrl).flush(response);

      expect(result).toEqual(response);
    });

    it('deve enviar o header Authorization quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.getMetas().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');

      req.flush({ data: [] });
    });

    it('não deve enviar o header Authorization quando não houver token', () => {
      service.getMetas().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.has('Authorization')).toBeFalse();

      req.flush({ data: [] });
    });

    it('deve propagar o erro da API', () => {
      let error: any;

      service.getMetas().subscribe({ error: (e) => (error = e) });

      httpMock
        .expectOne(apiUrl)
        .flush({ message: 'Não autorizado' }, { status: 401, statusText: 'Unauthorized' });

      expect(error.status).toBe(401);
    });
  });

  describe('postMeta', () => {
    it('deve enviar POST para /metas com o payload', () => {
      service.postMeta(meta).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(meta);

      req.flush({ data: meta });
    });

    it('deve enviar o header Authorization quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.postMeta(meta).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');

      req.flush({ data: meta });
    });

    it('não deve enviar o header Authorization quando não houver token', () => {
      service.postMeta(meta).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.headers.has('Authorization')).toBeFalse();

      req.flush({ data: meta });
    });
  });

  describe('putMeta', () => {
    const id = 'abc123';

    it('deve enviar PUT para /metas/:id com o payload', () => {
      service.putMeta(id, meta).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(meta);

      req.flush({ data: meta });
    });

    it('deve enviar o header Authorization quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.putMeta(id, meta).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');

      req.flush({ data: meta });
    });

    it('não deve enviar o header Authorization quando não houver token', () => {
      service.putMeta(id, meta).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.headers.has('Authorization')).toBeFalse();

      req.flush({ data: meta });
    });

    it('deve propagar o erro quando a meta não existe (404)', () => {
      let error: any;

      service.putMeta(id, meta).subscribe({ error: (e) => (error = e) });

      httpMock
        .expectOne(`${apiUrl}/${id}`)
        .flush({ message: 'Meta não encontrada' }, { status: 404, statusText: 'Not Found' });

      expect(error.status).toBe(404);
    });
  });

  describe('patchAmountSaved', () => {
    const id = 'abc123';

    it('deve enviar PATCH para /metas/:id/amount-saved com { amountSaved }', () => {
      service.patchAmountSaved(id, 2500).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}/amount-saved`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ amountSaved: 2500 });

      req.flush({ data: {} });
    });

    it('deve enviar o header Authorization quando houver token', () => {
      localStorage.setItem('token', 'meu-token');

      service.patchAmountSaved(id, 2500).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}/amount-saved`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');

      req.flush({ data: {} });
    });

    it('não deve enviar o header Authorization quando não houver token', () => {
      service.patchAmountSaved(id, 2500).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${id}/amount-saved`);
      expect(req.request.headers.has('Authorization')).toBeFalse();

      req.flush({ data: {} });
    });
  });
});