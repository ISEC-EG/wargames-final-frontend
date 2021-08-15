import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VolumeService } from "src/app/core/volume/volume.service";

@Component({
  selector: "app-right-side-bar",
  templateUrl: "./right-side-bar.component.html",
  styleUrls: ["./right-side-bar.component.scss"],
})
export class RightSideBarComponent implements OnInit {
  soundMuted: boolean = false;
  imageSrc = "/assets/wargames/Sound-On.png";

  constructor(private router: Router, private volumeService: VolumeService) {}

  ngOnInit() {}

  scoreBoard() {
    this.router.navigate(["/score-board"], { replaceUrl: false });
  }

  challenges() {
    this.router.navigate(["/challenges"], { replaceUrl: false });
  }

  rules() {
    this.router.navigate(["/rules"], { replaceUrl: false });
  }

  toggleSound() {
    if (this.soundMuted) {
      this.soundMuted = false;
      this.imageSrc = "/assets/wargames/Sound-On.png";
      this.volumeService.play();
    } else {
      this.soundMuted = true;
      this.imageSrc = "/assets/wargames/Sound-Off.png";
      this.volumeService.pause();
    }
  }

  
}
