import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {}
