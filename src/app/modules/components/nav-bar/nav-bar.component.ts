import { Component } from '@angular/core';
import {JwtService} from "../../../services/jwt.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  public constructor(
    private jwtService: JwtService,
  ) {}

  public logout() {
    this.jwtService.removeToken();
  }
}
