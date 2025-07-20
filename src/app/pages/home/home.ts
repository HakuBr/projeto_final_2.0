import { Component, inject } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { BoasVindas } from "../../components/boas-vindas/boas-vindas";
import { Router, RouterLink } from '@angular/router';
import { Copy } from "../../components/copy/copy";
import { Carousel } from "../../components/carousel/carousel";
import { CardsHome } from "../../components/cards-home/cards-home";

@Component({
  selector: 'app-home',
  imports: [Menu, RouterLink, Carousel, CardsHome, Copy],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  router = inject(Router)

  logout(){
    sessionStorage.clear()
    this.router.navigate([""])
  }
  ngOnInit() {
  console.log('Componente Home inicializado');
}
}
