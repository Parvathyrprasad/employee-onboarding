
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const emailCheckInterceptor: HttpInterceptorFn = (req, next) => {

  if (
    req.method === 'GET' &&
    req.url.startsWith('/api/check-email')
  ) {
    const email = new URL(
      req.urlWithParams,
      'http://localhost'
    ).searchParams.get('email')?.toLowerCase();

    const exists =
      email === 'admin@company.com' ||
      email === 'hr@company.com';

    return of(
      new HttpResponse({
        status: 200,
        body: { exists }
      })
    ).pipe(delay(800));
  }

  return next(req);
};
