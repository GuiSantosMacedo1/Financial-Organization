import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetasService } from '../../core/services/metas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-metas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-metas.component.html',
  styleUrl: './modal-metas.component.scss'
})
export class ModalMetasComponent {
  @Input() isOpen = false
  @Output() close = new EventEmitter<void>();
  @Output() metaCreate = new EventEmitter<any>();

  errorMessage = ''
  metas = {
    title:'',
    description:'',
    amount: 0,
    amountSaved: 0,
    date:'',
    saved:false
  }

  constructor(private serviceMetas: MetasService){}

  closeModal(){
    this.close.emit();
  }

  validateForm(): boolean {
  if (!this.metas.description || this.metas.amount <= 0 || !this.metas.title || !this.metas.date) {
    this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    return false;
  }
  return true;
}
  validateAmount(): boolean {
    if(this.metas.amount < this.metas.amountSaved){
      this.errorMessage = 'Por favor, coloque o valor para ser atingido maior que o valor para ser guardado';
      return false
    }
    return true
  }
  putMetas() {
    if(!this.validateForm()){
      this.errorMessage
      return;
    }
    if(!this.validateAmount()){
      this.errorMessage
      return;
    }
    this.serviceMetas.postMeta(this.metas).subscribe(response => {
      this.metaCreate.emit(response);
      this.closeModal();
    })
  }
}
