import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "@shared/components";

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
