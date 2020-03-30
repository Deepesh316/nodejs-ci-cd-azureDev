import mongoose from "../config/dbConnection";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

/**
 * User Schema
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
