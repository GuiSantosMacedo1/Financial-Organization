// account-settings.component.ts
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../core/services/account.service';

export function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const newPassword = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return newPassword && confirm && newPassword !== confirm
    ? { passwordsMismatch: true }
    : null;
}

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  profileForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  profileMessage = '';
  profileError = '';
  passwordMessage = '';
  passwordError = '';

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: (res) => {
        this.profileForm.patchValue(res.data);
        this.profileForm.markAsPristine();
      },
      error: () => (this.profileError = 'Não foi possível carregar sua conta.'),
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid || this.profileForm.pristine) return;

    this.profileMessage = '';
    this.profileError = '';

    this.accountService.updateAccount(this.profileForm.getRawValue()).subscribe({
      next: () => {
        this.profileMessage = 'Dados atualizados com sucesso.';
        this.profileForm.markAsPristine();
      },
      error: () => (this.profileError = 'Erro ao atualizar os dados.'),
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    this.passwordMessage = '';
    this.passwordError = '';

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();

    this.accountService.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.passwordMessage = 'Senha alterada com sucesso.';
        this.passwordForm.reset();
      },
      error: (err) =>
      (this.passwordError =
        err.status === 400 || err.status === 401
          ? 'Senha atual incorreta.'
          : 'Erro ao alterar a senha.'),
    });
  }
}