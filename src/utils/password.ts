import bcrypt from "bcryptjs";

class HashPassword {
  /**
   * Function to encrypt password using bcryptjs
   * @param password
   */
  public static async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      // hash the password along with our new salt
      const hashPwd = await bcrypt.hash(password, salt);
      return hashPwd;
    } catch (err) {
      throw err;
    }
  }
}

export default HashPassword;
