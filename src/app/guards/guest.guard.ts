import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { JwtService } from '../services/jwt.service';

export const guestGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  jwtService.authenticated.subscribe({
    next: (value) => {
      if (value) {
        router.navigate(['music']);
      }
    },
  });

  return true;
};
