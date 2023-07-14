export interface IUser {
  _id: string;
  username?: string;
  email: string;
  roles: string[];
  isActivated: boolean;
  activationLink: string;
  accessToken: string;
  refreshToken: string;
}
