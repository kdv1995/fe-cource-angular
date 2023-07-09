export interface ISignIn {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
}
export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
