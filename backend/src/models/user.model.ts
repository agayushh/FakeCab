import mongoose, { Schema, InferSchemaType, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name should be atleast of 3 characters"],
      },
      lastName: {
        type: String,
        minlength: [3, "Last Name should be atleast of 3 characters"],
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email should be of atleast 5 characters long"],
    },
    password: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next(); //only runs when password is changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      name: this.fullName,
      _id: this._id,
    },
    process.env.JWT_SECRET as string
  );
  return token;
};

type UserType = InferSchemaType<typeof userSchema>;

const User = model<UserType>("User", userSchema);

export default User;
