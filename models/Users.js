const { Schema } = require("mongoose");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique:true
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  console.log("this.password");
  const salt = await bcrypt.genSalt(10);
  console.log(salt, this);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
});
// do not use a na arrow function because it prevent the binding of this
UserSchema.methods.createJWT = function () {
  console.log(process.env.JWT_SECRETE)
  return jwt.sign({ id: this.id, name: this.name }, process.env.JWT_SECRETE);
};

UserSchema.methods.comparePassword = async function(canditatePassword){
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
