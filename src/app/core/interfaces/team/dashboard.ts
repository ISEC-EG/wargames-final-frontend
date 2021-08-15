export interface Dashboard {
  teams: [Team];
  count: number;
}

export interface Team {
  score: number;
  _id: string;
  name: string;
  country: string;
}

export interface Team_Page {
  pageNo: number;
  pageData: Team[];
}
