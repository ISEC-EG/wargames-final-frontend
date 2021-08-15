import { Injectable } from "@angular/core";
import { Howl } from "howler";

@Injectable({
  providedIn: "root",
})
export class VolumeService {
  // sound = new Howl({
  //   src: ["/assets/wargames/VIKINGS.mp3"],
  //   loop: false,
  //   volume: 0.7,
  // });

  constructor() {}

  play() {
    //  Play the sound.
    // this.sound.play();
  }

  pause() {
    // this.sound.pause();
  }

  stop() {
    // this.sound.stop();
  }
}
