import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetasService } from '../../core/services/metas.service';

export interface MetaItem {
  title: string;
  description?: string;
  amount?: number;
  amountSaved?:number;
  date?: string | Date;
  saved?: boolean;
}

@Component({
  selector: 'app-totals-metas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totals-metas.component.html',
  styleUrl: './totals-metas.component.scss'
})
export class TotalsMetasComponent {

  @Input() metas: MetaItem[] = []
  loading = false;
  error: string | null = null;

  constructor(private serviceMeta: MetasService){}

  ngOnInit(): void {
    this.getMetas();
  }
  today = new Date();
  getMetas(){
    this.loading = true;
    this.error = null;
    this.serviceMeta.getMetas().subscribe({
      next: (res) => {
        this.metas = res?.data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('getMetas error', err);
        this.error = err?.message || 'Erro ao carregar metas';
        this.loading = false;
      }
    });
  }

  formatNumber(value: number | string): string {
  return this.parseNumber(value)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
}

  valorFaltante(): number[] {
    return this.metas.map(m => this.valorFaltantePorMeta(m));
  }


  private parseNumber(value: number | string | null | undefined): number {
    if (!value) return 0;
    if (typeof value === 'number') {
      return value;
    }
    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    ) || 0;
  }

  private getValues(meta: MetaItem) {
    let amount = this.parseNumber(meta.amount);
    let saved = this.parseNumber(meta.amountSaved);
    // if (saved > amount) {
    //   [amount, saved] = [saved, amount];
    // }
    return { amount, saved };
  }

  valorFaltantePorMeta(meta: MetaItem): number {
    const { amount, saved } = this.getValues(meta);
    return Math.max(0, amount - saved);
  }

  percentageMeta(meta: MetaItem,digits = 1): string {
    const { amount, saved } = this.getValues(meta);
    const progress = amount ? saved / amount : 0;
    return new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'percent',
        maximumFractionDigits: digits
      }
    ).format(progress);
  }

  percentNumber(meta: MetaItem): number {
    const { amount, saved } =
      this.getValues(meta);
    return Math.round(
      (saved / amount) * 100
    ) || 0;
  }

  isOverdue(meta: MetaItem): boolean {
    const deadline = this.parseLocalDate(meta.date);
    if (!deadline) {
      return false;
    }

    const today = new Date(this.today);
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    return deadline < today;
  }

  formatMetaDate(value?: string | Date): string {
    const parsed = this.parseLocalDate(value);
    if (!parsed) {
      return '—';
    }

    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();

    return `${day}/${month}/${year}`;
  }

  private parseLocalDate(value?: string | Date): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    const datePart = value.slice(0, 10);
    const [year, month, day] = datePart.split('-').map(Number);

    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  }
  
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
