export interface IUser {
  id: string;
  email: string;
  role: string[];
}
export interface IUserSignIn extends IUser {
  accessToken: string;
}
export interface IUserSignUp extends IUser {
  accessToken: string;
  refreshToken: string;
}
