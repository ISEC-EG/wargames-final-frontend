import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { TokenService } from "../authentication/token.service";
import { SocketIOService } from "../socket/socket-io.service";

@Injectable({
  providedIn: "root",
})
export class SocketResolveService implements Resolve<any> {
  constructor(
    private socket: SocketIOService,
    private tokenService: TokenService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenService.token) {
      return this.socket.setupSocketConnection();
    } else return null;
  }
}
