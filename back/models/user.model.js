const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: { type: String},
    email: { type: String},
    password: { type: String},
    isPremium: { type: Boolean, default: false },
  },
  { collection: "users" }
);

module.exports = mongoose.model("user", usersSchema);