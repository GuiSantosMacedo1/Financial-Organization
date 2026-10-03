import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValorMetasComponent } from './add-valor-metas.component';
import { MetasService } from '../../core/services/metas.service';
import { of, throwError } from 'rxjs';

describe('AddValorMetasComponent', () => {
  let component: AddValorMetasComponent;
  let fixture: ComponentFixture<AddValorMetasComponent>;
  let metasService: jasmine.SpyObj<MetasService>;

  beforeEach(async () => {
    metasService = jasmine.createSpyObj<MetasService>('MetasService', ['patchAmountSaved']);

    await TestBed.configureTestingModule({
      imports: [AddValorMetasComponent],
      providers: [
        { provide: MetasService, useValue: metasService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddValorMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error when meta id is missing', () => {
  component.meta = {};
  component.metas.amountSaved = 50;

  component.patchMetas();

  expect(component.errorMessage).toBe('Erro ao encontrar o ID');
  expect(metasService.patchAmountSaved).not.toHaveBeenCalled();
});

it('should set error when amountSaved is invalid', () => {
  component.meta = { _id: '123' };
  component.metas.amountSaved = -1;
  component.metas.amount = 1000;

  component.patchMetas();

  expect(component.errorMessage).toBe('Informe um valor válido');
  expect(metasService.patchAmountSaved).not.toHaveBeenCalled();
});

it('should set error when saved amount is greater than target amount', () => {
  component.meta = { _id: '123' };
  component.metas.amount = 100;
  component.metas.amountSaved = 200;

  component.patchMetas();

  expect(component.errorMessage).toBe('Valor atual guardado não pode ser maior que o valor a ser atingindo');
  expect(metasService.patchAmountSaved).not.toHaveBeenCalled();
});

it('should set error message on patch failure', () => {
  component.meta = { _id: '123', amount: 500, amountSaved: 100 };
  component.metas.amount = 500;
  component.metas.amountSaved = 150;

  metasService.patchAmountSaved.and.returnValue(
    throwError(() => new Error('Erro'))
  );

  component.patchMetas();

  expect(component.errorMessage).toBe('Erro ao atualizar o valor guardado');
});
});
