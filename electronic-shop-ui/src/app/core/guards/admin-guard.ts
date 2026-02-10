import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);


  //check if user is logged in and has admin role if not redirect to login page
  if(!auth.isLoggedIn())
  {
    router.navigate(['/login']);
    return false;
  }

  //check if user has admin role if not redirect to login page
  if(auth.getRole() !== 'Admin') {
    router.navigate(['/login']);
    return false
  }
  return true;
};
