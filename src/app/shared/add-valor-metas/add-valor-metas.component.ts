import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MetasService } from '../../core/services/metas.service';

@Component({
  selector: 'app-add-valor-metas',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyMaskModule],
  templateUrl: './add-valor-metas.component.html',
  styleUrl: './add-valor-metas.component.scss'
})
export class AddValorMetasComponent {
  @Input() isOpen = false
  @Input() meta: any = null
  @Output() close = new EventEmitter<void>()
  @Output() saved = new EventEmitter<void>()

  metas = {
    amountSaved: 0
  }

  errorMessage = ''

  constructor(private serviceMetas: MetasService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['meta'] && this.meta) {
      this.metas = {
        amountSaved: this.meta.amountSaved ?? 0
      }
    }
  }

  patchMetas() {
    if (!this.meta?._id) {
      this.errorMessage = 'Erro ao encontrar o ID';
      return;
    }

    if (this.metas.amountSaved == null || this.metas.amountSaved < 0) {
      this.errorMessage = 'Informe um valor válido';
      return;
    }

    this.serviceMetas.patchAmountSaved(this.meta._id, Number(this.metas.amountSaved)).subscribe({
      next: () => {
        this.saved.emit();
        this.closeModal();
      },
      error: () => {
        this.errorMessage = 'Erro ao atualizar o valor guardado';
      }
    });
  }

  closeModal(){
    this.close.emit();
  }
}
