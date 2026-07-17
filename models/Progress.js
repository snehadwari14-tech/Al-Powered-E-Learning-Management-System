const mongoose =
  require("mongoose");

const progressSchema =
  new mongoose.Schema(
    {
      student: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      lesson: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
      },

      completed: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Progress",
    progressSchema
  );