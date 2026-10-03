import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;

    component.transactions = [
      { amount: 200 },
      { amount: -50 },
      { amount: 80 },
      { amount: -30 }
    ];

    component.configs = [
      { type: 'income', title: 'Receitas' },
      { type: 'expense', title: 'Despesas' },
      { type: 'balance', title: 'Saldo' },
      { type: 'count', title: 'Transações' }
    ];

    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totals correctly', () => {
    expect(component.totals.income).toBe(280);
    expect(component.totals.expense).toBe(80);
    expect(component.totals.balance).toBe(200);
    expect(component.totals.count).toBe(4);
  });

  it('should return total by type', () => {
    expect(component.getValue('income')).toBe(280);
    expect(component.getValue('expense')).toBe(80);
    expect(component.getValue('balance')).toBe(200);
    expect(component.getValue('count')).toBe(4);
  });

  it('should format currency in Brazilian format', () => {
    expect(component.formatCurrency(1250.5)).toBe('R$ 1.250,50');
  });

  it('should return the correct title by type', () => {
    expect(component.titleByType('income')).toBe('Receitas');
    expect(component.titleByType('expense')).toBe('Despesas');
    expect(component.titleByType('balance')).toBe('Saldo');
    expect(component.titleByType('count')).toBe('Transações');
  });

  it('should return the correct icon by type', () => {
    expect(component.iconByType('income')).toBe('fa-solid fa-arrow-up');
    expect(component.iconByType('expense')).toBe('fa-solid fa-arrow-down');
    expect(component.iconByType('balance')).toBe('fa-solid fa-balance-scale');
    expect(component.iconByType('count')).toBe('fa-solid fa-list-check');
  });

  it('should return the correct background color by type', () => {
    expect(component.backGroundColor('income')).toBe('rgb(175, 249, 175)');
    expect(component.backGroundColor('expense')).toBe('rgb(251, 201, 201)');
    expect(component.backGroundColor('balance')).toBe('rgb(180, 236, 255)');
    expect(component.backGroundColor('count')).toBe('rgb(180, 236, 255)');
  });

  it('should return the correct text color by type', () => {
    expect(component.colorText('income')).toBe('green');
    expect(component.colorText('expense')).toBe('red');
    expect(component.colorText('balance')).toBe('blue');
    expect(component.colorText('count')).toBe('blue');
  });
});