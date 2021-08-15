import { Injectable } from "@angular/core";
import { io } from "socket.io-client";
import { environment } from "src/environments/environment";
import { TeamService } from "../http/team/team.service";

@Injectable({
  providedIn: "root",
})
export class SocketIOService {
  socket;
  constructor(private teamService: TeamService) {}

  async setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      path: "/wargames/",
      query: { data: "info" },
    });
    await this.joinToRoom();
  }

  async joinToRoom() {
    let teamID = this.teamService.team_profile_information._id;
    if (teamID !== null || teamID !== undefined) {
      this.socket.on("connect", () => {
        this.socket.emit("joinRequest", teamID);
      });
    }
  }

  get socketIO() {
    return this.socket;
  }
}
