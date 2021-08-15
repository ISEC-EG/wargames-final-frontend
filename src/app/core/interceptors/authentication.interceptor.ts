import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './../authentication/token.service';
import { AuthService } from './../authentication/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor(private tokenService: TokenService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.tokenService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.tokenService.token
        }
      });
    } else if (this.tokenService.tokenTemp) {
      request = request.clone({
        setHeaders: {
          Authorization: this.tokenService.tokenTemp
        }
      });
    }

    return next.handle(request);
  }
}
