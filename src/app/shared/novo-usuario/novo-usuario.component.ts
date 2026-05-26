import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-novo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-usuario.component.html',
  styleUrl: './novo-usuario.component.scss'
})
export class NovoUsuarioComponent {
  @Output() userCreate = new EventEmitter<any>()
  constructor(private loginService: LoginService, private route: Router){}

  errorMessage = ''
  createUser = {
    name: '',
    email: '',
    password: ''
  }

  createUsers() {
    if(!this.validateForm()){
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }
    this.errorMessage = '';

    this.loginService.postUser(this.createUser).subscribe(response => {
      this.userCreate.emit(response);
      this.route.navigate(['/login'])
    }, error => {
      this.errorMessage = 'Erro ao logar'
      console.error('Erro ao logar', error)
    })
    
  }

    validateForm(): boolean {
    if (!this.createUser.email || !this.createUser.password) {
      return false;
    }
    return true;
  }
}
