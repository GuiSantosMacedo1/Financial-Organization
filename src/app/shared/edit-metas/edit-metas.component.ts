import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-metas',
  standalone: true,
  imports: [],
  templateUrl: './edit-metas.component.html',
  styleUrl: './edit-metas.component.scss'
})
export class EditMetasComponent {
  @Input() isOpen = false
  @Output() close = new EventEmitter<void>()

  closeModal(){
    this.close.emit();
  }
}
