const mongoose = require("mongoose");

const courseSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        default: 0
      },

      instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      thumbnail: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Course",
    courseSchema
  );