import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // SSR ortamını kontrol et
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  const isLoggedIn = isBrowser ? localStorage.getItem('isLoggedIn') === 'true' : false;

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
