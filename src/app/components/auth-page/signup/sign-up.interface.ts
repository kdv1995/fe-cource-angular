export interface ISignUp {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
}
export interface ISignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
