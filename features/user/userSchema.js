import mongoose from "mongoose";

// email validator
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name should be min of 2 char"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: validateEmail, message: "Invalid email format." },
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: { type: String },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
});

userSchema.index({ "revokedToken.createdAt": 1 }, { expireAfterSeconds: 0 });

const userModel = mongoose.model("User", userSchema);

export default userModel;
