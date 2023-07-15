import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private jwt: JwtService,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.jwt.getToken();
    this.loadingService.startLoading();

    if (token) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(modifiedRequest).pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      );
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.stopLoading();
      })
    );
  }
}
