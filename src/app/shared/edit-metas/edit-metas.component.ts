import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MetasService } from '../../core/services/metas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-edit-metas',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyMaskModule],
  templateUrl: './edit-metas.component.html',
  styleUrl: './edit-metas.component.scss'
})
export class EditMetasComponent {
  @Input() isOpen = false
  @Input() meta: any = null
  @Output() close = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()

  errorMessage = ''
  metas = {
    _id: '',
    title: '',
    description: '',
    amount: 0,
    amountSaved: 0,
    date: '',
    saved: false
  }

  constructor(private serviceMetas: MetasService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['meta'] && this.meta) {
      this.metas = {
        ...this.meta,
        date: this.meta.date?.split('T')[0] ?? ''
      }
    }
  }

  validateForm(): boolean {
    if (!this.metas.description || this.metas.amount <= 0 || !this.metas.title || !this.metas.date) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return false;
    }
    return true;
  }
  validateAmount(): boolean {
    if (this.metas.amount < this.metas.amountSaved) {
      this.errorMessage = 'Por favor, coloque o valor para ser atingido maior que o valor para ser guardado';
      return false
    }
    return true
  }

  putMetas() {
    if (!this.metas?._id) {
      this.errorMessage = 'Erro ao encontrar o ID'
      console.log("🚀 ~ EditMetasComponent ~ metas:", this.metas)
      return
    }
    if (!this.validateForm()) {
      this.errorMessage = 'Precisa preencher todos os campos'
      return
    }
    const payload = {
      _id: this.metas._id,
      title: this.metas.title,
      description: this.metas.description,
      amount: this.metas.amount,
      amountSaved: this.metas.amountSaved,
      date: this.metas.date,
      saved: this.metas.saved
    }
    this.serviceMetas.putMeta(this.metas._id, payload).subscribe({
      next: () => {
        this.edit.emit()
        this.closeModal();
      }
    })
  }

  closeModal() {
    this.close.emit();
  }
}
