import {Component, computed, Inject, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { SubSink } from 'subsink';

import { JwtService } from "../../../services/jwt.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnDestroy {

  protected signUpForm!: FormGroup;
  private sub = new SubSink();

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }


  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public submitForm() {
    if (this.signUpForm.valid) {
      this.sub.sink = this.authService
        .signUp(this.signUpForm.value)
        .subscribe({
          complete: () => {
            this.signUpForm.reset();
            this.navigateTo('');
          },
          error: (err: any) => {
            console.error(err.message);
          },
        });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
