import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() userCreate = new EventEmitter<any>()
  constructor(private loginService: LoginService, private route: Router){}

  errorMessage = ''
  login = {
    email: '',
    password: ''
  }

  userLogin() {
    if(!this.validateForm()){
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }
    this.errorMessage = '';

    this.loginService.loginUser(this.login).subscribe(response => {
      const token = response?.token ?? response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      this.userCreate.emit(response);
      this.route.navigate(['/dashboard'])
    }, error => {
      this.errorMessage = 'Erro ao logar'
      console.error('Erro ao logar', error)
    })
    
  }

  toggleRegister() {
    this.route.navigate(['/novoUsuario'])
  }

    validateForm(): boolean {
    if (!this.login.email || !this.login.password) {
      return false;
    }
    return true;
  }
}
