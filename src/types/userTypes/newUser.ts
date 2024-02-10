export type NewUSer = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role?: string;
  gender: string;
  dob: string;
};
export interface ResponceOFNewUser {
  success: boolean;
  message: string;
}
