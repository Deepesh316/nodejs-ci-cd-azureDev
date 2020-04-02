import User, { IUser } from "../models/user.model";
import HashPassword from "../utils/password";

export class UserService {
  /**
   * Function to check existence of user if not then create new user in db
   * @param User
   */
  public static async createUserService(user: IUser): Promise<any> {
    try {
      // Check for existence of user in db
      const userRecord = await User.findOne({ email: user.email });
      if (userRecord) {
        throw new Error("RECORD ALREADY EXISTS");
      }

      const encPwd = await HashPassword.encryptPassword(user.password); // Encrypt user entered password
      user.password = encPwd;
      user.role = "user";

      const createdUser = await User.create(user); // create user
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}
