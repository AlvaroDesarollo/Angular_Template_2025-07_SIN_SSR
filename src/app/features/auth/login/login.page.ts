import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, AuthService } from '@core/services';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);

  submitting = false;

  constructor(
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {}

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(4)]],
  });
  
  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { email, code } = this.form.getRawValue();

    try {
      const response = await this.authService.verifyLoginCode(
        String(email),
        String(code),
      );

      const payload = response?.payload ?? {};
      if (
        !response?.accessToken ||
        !payload?.email ||
        !payload?.fullName ||
        !payload?.id
      ) {
        throw new Error('Respuesta de autenticacion incompleta');
      }

      this.authService.setSession({
        accessToken: response.accessToken,
        email: payload.email,
        fullName: payload.fullName,
        userId: payload.id,
      });

      this.alertService.showAlert({
        type: 'success',
        message: 'Sesion iniciada correctamente',
        duration: 2000,
      });

      await this.router.navigateByUrl('/');
    } catch {
      this.alertService.showAlert({
        type: 'error',
        message: 'No fue posible iniciar sesion. Verifica tus datos.',
        duration: 3000,
      });
    } finally {
      this.submitting = false;
    }
  }
}

