import { NewUSer } from "./userTypes/newUser";

export interface userReducerInitialType {
  user: NewUSer | null;
  loading: boolean;
}

export type AllUserResponce = {
  success: boolean;
  users: NewUSer[];
};
