export interface UserType {
  id?: number;
  username?: string;
  password?: string;
  roles?: string[];
}

export class UserClass {
  id?: number;
  username?: string;
  password?: string;
  roles?: string[];
  email?:string;
  enabled?:boolean;
}
