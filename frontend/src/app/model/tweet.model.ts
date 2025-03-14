import {UserAccount} from './userAccount.model';

export class Tweet {
  id!: number;
  content!: string;
  imageUrl!: string;
  videoUrl!: string;
  createdAt!: Date;
  lastChangedAt!: Date;
  numOfLikes!: number;
  numOfComments!: number;
  numOfRetweets!: number;
  numOfSaves!: number;
  numOfImpressions!: number;
  userResponse!: UserAccount;

  constructor(data: Partial<Tweet>) {
    Object.assign(this, data);
  }
}
