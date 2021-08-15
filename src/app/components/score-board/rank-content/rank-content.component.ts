import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/core/interfaces/team/dashboard';

@Component({
  selector: 'app-rank-content',
  templateUrl: './rank-content.component.html',
  styleUrls: ['./rank-content.component.scss']
})
export class RankContentComponent implements OnInit {

  @Input() rankNo: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

   toKebabCase(str) {
    return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
  }

}
