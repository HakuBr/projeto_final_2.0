  import { Component, inject } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { LoginS } from '../../services/login';
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common';
  declare var bootstrap: any;

  @Component({
    selector: 'app-login-forms',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login-forms.html',
    styleUrl: './login-forms.css'
  })


  export class LoginForms {
    errorMessage: string = ''
    loginService = inject(LoginS)
    router = inject(Router)

    loginForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      senha: new FormControl("", [Validators.required])
    })

    loginJp() {
      const { nome, senha } = this.loginForm.value;

      if (!this.loginForm.valid || !nome || !senha) {
        this.errorMessage = "Preencha todos os campos obrigatórios.";
        this.exibirModalErro();
        return;
      }

      this.loginService.login(nome, senha).subscribe({
        error: (e) => {
          if (e.status === 401) {
            this.errorMessage = "Usuário ou senha incorretos.";
          } else {
            this.errorMessage = `Erro ${e.status}: ${e.message}`;
          }
          this.exibirModalErro();
        },
        next: () => {
          this.router.navigate(["/home"]);
        }
      });
    }

    exibirModalErro() {
      const modalElement = document.getElementById('loginErrorModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
    navigateToCadastro() {
      this.router.navigate(['/cadastro']);
    }
    get nome() {
      return this.loginForm.get('nome');
    }
    get senha() {
      return this.loginForm.get('senha');
    }
  }
