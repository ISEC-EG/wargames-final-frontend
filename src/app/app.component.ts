import { Component, OnInit } from '@angular/core';
import { TeamService } from './core/http/team/team.service';
// import { VolumeService } from './core/volume/volume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wargames';

  constructor(private teamService: TeamService) {}

  async ngOnInit() {
    await this.teamService.csrfToken().toPromise();
    // this.volumeService.play();

  }
}
