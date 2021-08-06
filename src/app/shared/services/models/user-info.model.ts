import { Language } from "../language.service";

export class UserInfo {
  constructor(
    public email: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public description: string = '',
    public phoneNumber: string = '',
    public photoURL: string = '',
    public providerId: string = '',
    public uid: string = '',
    public language: {
      native?: Language
      write?: Language
    } | undefined = undefined
  ) {
  }

  public static getInitials(firstName: string, lastName: string): string {
    return `${UserInfo.getInitial(firstName)}${UserInfo.getInitial(lastName)}`;
  }

  private static getInitial(name: string): string {
    if (name && name.length > 0) {
      return name[0].toUpperCase();
    }

    return '';
  }
}
