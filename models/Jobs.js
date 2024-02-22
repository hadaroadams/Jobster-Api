const { Schema, model, Types } = require("mongoose");

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      require: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model("Job", JobSchema);
