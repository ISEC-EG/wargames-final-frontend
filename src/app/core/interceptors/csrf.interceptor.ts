import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  static headerName = "x-csrf-token";
  static xsrfMethods = ["post", "delete", "put", "patch"];

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestMethod = HttpXsrfInterceptor.requestMethod(req);
    if (HttpXsrfInterceptor.shouldInterceptRequest(requestMethod)) {
      const token = this.tokenExtractor.getToken();
      if (HttpXsrfInterceptor.shouldAddXsrfToken(token, req) && token != null) {
        req = req.clone({
          headers: req.headers.set(HttpXsrfInterceptor.headerName, token),
        });
      }
    }
    return next.handle(req);
  }

  private static shouldAddXsrfToken(token, req: HttpRequest<any>): boolean {
    return token !== null && !req.headers.has(HttpXsrfInterceptor.headerName);
  }

  private static shouldInterceptRequest(requestMethod): boolean {
    return (
      requestMethod && HttpXsrfInterceptor.xsrfMethods.includes(requestMethod)
    );
  }

  private static requestMethod(req: HttpRequest<any>): string {
    const requestMethod: string = req.method;
    return requestMethod.toLowerCase();
  }
}
