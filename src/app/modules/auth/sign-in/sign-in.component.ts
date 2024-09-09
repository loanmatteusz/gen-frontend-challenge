import {Component, computed, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SubSink } from "subsink";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnDestroy {

  protected signInForm!: FormGroup;
  private sub = new SubSink();

  public constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.signInForm = this.formBuilder.group({
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

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public submit() {
    if (this.signInForm.valid) {
      this.sub.sink = this.authService
        .signIn(this.signInForm.value)
        .subscribe({
          complete: () => {
            this.signInForm.reset();
          },
          error: (err: any) => {
            console.error(err.message);
          },
        });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
