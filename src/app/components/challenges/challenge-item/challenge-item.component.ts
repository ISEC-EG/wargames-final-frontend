import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/app/core/interfaces/challenge/challenge';

@Component({
  selector: 'app-challenge-item',
  templateUrl: './challenge-item.component.html',
  styleUrls: ['./challenge-item.component.scss']
})
export class ChallengeItemComponent implements OnInit {

  @Input() challengeInfo: Challenge;

  constructor() { }

  ngOnInit() {
  }

}
