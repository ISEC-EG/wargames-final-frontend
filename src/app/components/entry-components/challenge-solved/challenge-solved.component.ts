import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-challenge-solved",
  templateUrl: "./challenge-solved.component.html",
  styleUrls: ["./challenge-solved.component.scss"],
})
export class ChallengeSolvedComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ChallengeSolvedComponent>) {}

  ngOnInit() {
    let timeout = 3000;
    this.dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        this.dialogRef.close();
      }, timeout);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
