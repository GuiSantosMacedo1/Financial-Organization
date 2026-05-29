import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MetasService } from '../../core/services/metas.service';

export type CardType = 'totals' | 'completed' | 'save' | 'goals';

export interface CardConfig {
  type: CardType;
  title?: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-cards-metas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-metas.component.html',
  styleUrl: './cards-metas.component.scss'
})

export class CardsMetasComponent implements OnInit {
  @Input() configs: CardConfig[] = []

  metas: any[] = []

  constructor(private serviceMeta: MetasService) { }

  ngOnInit(): void {
    this.getMetas();
  }

  getMetas() {
    this.serviceMeta.getMetas().subscribe({
      next: (res: any) => {
        this.metas = res?.data ?? [];
      },
      error: (err: any) => {
        console.error('Erro ao carregar metas em CardsMetasComponent', err);
        this.metas = [];
      }
    })
  }

  totalsMetas(type: CardType): string | number {
    if (!Array.isArray(this.metas)) return 0;
    if (type === 'totals') {
      return this.metas.length;
    }
    if (type === 'completed') {
      return this.metas.filter(m => m.saved === true).length;
    }
    if (type === 'save') {
      const totalSaved = this.metas.reduce((acc, m) => acc + (Number(m.amountSaved) || 0), 0);
      return this.formatCurrency(totalSaved);
    }
    const totalAmount = this.metas.reduce((acc, m) => acc + (Number(m.amount) || 0), 0);
    return this.formatCurrency(totalAmount);
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  titleByType(type: CardType) {
    const map = { totals: 'Totais', completed: 'Concluido', save: 'Poupado', goals: 'Meta' };
    return map[type];
  }

  iconByType(type: CardType) {
    const map = {
      totals: 'fa-regular fa-flag',
      completed: 'fa-regular fa-circle-check',
      save: 'fa-solid fa-coins',
      goals: 'fa-solid fa-list-check'
    };
    return map[type];
  }

  backGroundColor(type: CardType) {
    const map = {
      totals: 'rgb(185, 185, 255)',
      completed: 'rgb(203, 251, 201)',
      save: 'rgb(255, 248, 199)',
      goals: 'rgb(230, 175, 255)'
    };
    return map[type];
  }
  colorText(type: CardType) {
    const map = {
      totals: 'blue',
      completed: 'green',
      save: 'rgb(204, 133, 0)',
      goals: 'purple'
    };
    return map[type];
  }
}
