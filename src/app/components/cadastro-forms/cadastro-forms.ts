import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-cadastro-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-forms.html',
  styleUrl: './cadastro-forms.css'
})
export class CadastroForms {
  router = inject(Router);
  fb = inject(FormBuilder);

  cadastroForm: FormGroup = this.fb.group({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    termos: new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    console.log('Dados cadastrados:', this.cadastroForm.value);
    this.exibirModalSucesso();
  }

  exibirModalSucesso(): void {
    const modalElement = document.getElementById('cadastroSuccessModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      setTimeout(() => {
        modal.hide();
        this.router.navigate([""]);
      }, 2000); // redireciona em 3 segundos
    }
  }

  // Getters para facilitar o acesso nos templates
  get nome() {
    return this.cadastroForm.get('nome');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get senha() {
    return this.cadastroForm.get('senha');
  }

  get termos() {
    return this.cadastroForm.get('termos');
  }
}
