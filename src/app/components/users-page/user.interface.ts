export interface IUsersRequest {
  _id: string;
  email: string;
  roles: string[];
  isActivated: boolean;
  activationLink: string;
}
