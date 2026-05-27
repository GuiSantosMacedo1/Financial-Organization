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
  today = new Date().toLocaleDateString('pt-BR');;
  getMetas(){
    console.log("🚀 ~ TotalsMetasComponent ~ today:", this.today)
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
}
