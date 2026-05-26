import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

export class CardsMetasComponent {
  @Input() configs: CardConfig[] = []


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
