import { Language } from "../language.service";
export class UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
  language: {
    native: Language;
    write: Language;
  };
  isComplete: boolean
}
