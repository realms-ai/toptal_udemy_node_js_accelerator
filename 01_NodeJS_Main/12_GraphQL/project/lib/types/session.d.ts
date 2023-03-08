import { Session } from 'express-session';
import { UserMethods, UserModel, UserType } from '../../app/models/user.ts';

declare module 'express-session' {
  interface Session {
    isLoggedIn: boolean;
    userId: String;
    // user: UserType;
  }
}
