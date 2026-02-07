import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        alert(error.error?.message || 'Something went wrong');
        return throwError(() => error);
      })
  );
};
