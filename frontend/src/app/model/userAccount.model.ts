export class UserAccount {
  id!: number;
  username!: string;
  firstName!: string;
  lastName!: string;

  constructor(data: Partial<UserAccount>) {
    Object.assign(this, data);
  }
}
