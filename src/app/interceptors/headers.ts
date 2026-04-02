import { HttpInterceptorFn } from "@angular/common/http";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const modified = req.clone({
    setHeaders: {
      'User-Agent': 'open-library-uster-app (austin.jones@uster.com)',
    }
  });

  return next(modified);
}
