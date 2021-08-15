export interface Challenge {
  _id: string;
  description: string;
  level?: number;
  points?: number;
  category: string;
  title: string;
  solved?: boolean;
  externalLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AllChallenges {
  count: number;
  challenges: [Challenge]
}
