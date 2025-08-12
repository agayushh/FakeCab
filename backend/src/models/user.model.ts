import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        require: true,
        minlength: [3, "First Name should be atleast of 3 characters"],
      },
      lastName: {
        type: String,
        minlength: [3, "Last Name should be atleast of 3 characters"],
      },
    },
    minlength: [5, "password should be atleast 5 characters long"],

    email: {
      type: String,
      require: true,
      unique: true,
      minlength: [5, "Email should be of atleast 5 characters long"],
    },
    password: {
      type: String,
      require: true,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof userSchema>;

const User = model<UserType>("User", userSchema);

export default User;
