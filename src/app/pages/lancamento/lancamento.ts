import { Component, inject, OnInit } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Router } from '@angular/router';
import { Car, CarService } from '../../services/car';
import { CommonModule } from '@angular/common';
import { Copy } from "../../components/copy/copy";

declare var bootstrap: any;

@Component({
  selector: 'app-lancamento',
  imports: [Menu, CommonModule, Copy],
  templateUrl: './lancamento.html',
  styleUrl: './lancamento.css'
})
export class Lancamento implements OnInit {
  router = inject(Router);

  cars = [
    new Car('XL Cabine Simples', 183850, 511, 1821, 232, 1234, '2.2 Diesel', 160, 1420, 'Aço Estampado 16', 'XL Cabine.png'),
    new Car('XLS 2.2 Diesel', 220690, 511, 1821, 232, 1076, '2.2 Diesel', 160, 1180, 'Aço Estampado 16', 'xls 2.2 diesel.png'),
    new Car('Storm', 222790, 511, 1821, 232, 1040, '3.2 Diesel', 200, 1180, 'Liga Leve 17', 'storm.png'),
  ];

  carArr: Car[] = [];
  showComparison = false;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.clearCars();
    this.carArr = this.carService.getCars();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  updateCompareTable(): void {
    this.carArr = this.carService.getCars();
  }

  setCarToCompare(event: any, car: Car): void {
  const isChecked = event.target.checked;

  if (isChecked) {
    // Só adiciona se ainda houver menos que 2 carros selecionados
    if (this.carArr.length < 2) {
      this.carService.addCar(car);
    } else {
      // Se tentar selecionar o 3º carro, "desmarca" o checkbox para evitar seleção
      event.target.checked = false;
    }
  } else {
    this.carService.removeCar(car);
  }
  this.updateCompareTable();
}


  isCarSelected(car: Car): boolean {
    return this.carArr.some(c => c.nome === car.nome);
  }

  showCompare(): void {
    // Só habilita se exatamente 2 carros selecionados, botão já está desabilitado caso contrário.
    this.updateCompareTable();
    this.showComparison = true;
  }
}
