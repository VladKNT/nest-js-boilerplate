import { hash, compare } from 'bcrypt';

export class PasswordHelper {
  static hashPassword(password: string): Promise<string> {
    return hash(password, process.env.PASSWORD_SALT);
  }

  static comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
