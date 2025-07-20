import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from "../../components/menu/menu";
import { Copy } from "../../components/copy/copy";

declare var bootstrap: any;

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [Menu, Copy, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  router = inject(Router);

  formData = {
    nome: '',
    email: '',
    cpf: '',
    sobrenome: '',
    telefone: '',
    contato: '',
    mensagem: '',
    termos: false,
    receberDescontos: false
  };

  // Mensagem que será exibida no modal de erro
  errorMessage: string = '';

  onSubmit() {
    console.log('Tentativa de envio:', this.formData);

    const camposObrigatoriosPreenchidos =
      this.formData.nome.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.cpf.trim() !== '' &&
      this.formData.sobrenome.trim() !== '' &&
      this.formData.telefone.trim() !== '' &&
      this.formData.contato.trim() !== '' &&
      this.formData.termos === true;

    if (!camposObrigatoriosPreenchidos) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios e aceite os termos.';
      this.exibirModal('loginErrorModal');
      return;
    }
    if (!this.formData.termos) {
    this.errorMessage = 'Você precisa aceitar os termos da LGPD para continuar.';
    this.exibirModal('loginErrorModal');
    return;
  }

    // Se quiser, adicione outras validações específicas aqui

    this.exibirModal('successModal');
    this.limparFormulario();
  }


  exibirModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  limparFormulario() {
    this.formData = {
      nome: '',
      email: '',
      cpf: '',
      sobrenome: '',
      telefone: '',
      contato: '',
      mensagem: '',
      termos: false,
      receberDescontos: false
    };
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
}
