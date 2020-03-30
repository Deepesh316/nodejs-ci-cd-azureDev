import User, { IUser } from "../models/user.model";
import HashPassword from "../utils/password";

class UserService {
  private user;

  constructor() {
    this.user = User;
  }

  /**
   * Function to check existence of user if not then create new user in db
   * @param user
   */
  public async createUserService(user: IUser): Promise<any> {
    try {
      // Check for existence of user in db
      const userRecord = await this.user.findOne({ email: user.email });
      if (userRecord) {
        throw new Error("RECORD ALREADY EXISTS");
      }

      const encPwd = await HashPassword.encryptPassword(user.password); // Encrypt user entered password
      user.password = encPwd;
      user.role = "user";

      const createdUser = await this.user.create(user); // create user
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
