export interface IUser {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  roles?: string[];
  activationLink?: string;
  isActivated?: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export interface IUserSignInRequest extends IUser {}
export interface IUserSignInResponse extends IUser {}
export interface IUserSignUpRequest extends IUser {}

export interface IUserSignUpResponse extends IUser {}

export interface ICurrentUser extends IUser {}
