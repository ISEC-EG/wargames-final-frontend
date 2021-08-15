import { Challenge } from "../challenge/challenge";

export interface TeamProfileInfo {
  _id: string;
  userID: string;
  score: number;
  name: string;
  email: string;
  country: string;
  member: string[];
  rank: number;
  solutions: [
    {
      _id?: string;
      points: number;
      challenge: Challenge;
      createdAt?: Date;
      updatedAt: Date;
    }
  ];
  totalChallenges: number;
}

export interface Solution {
  _id?: string;
  points: number;
  challenge: Challenge;
  createdAt?: Date;
  updatedAt: Date;
}
