const mongoose =
  require("mongoose");

const assignmentSchema =
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

      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },

      submissions: [
        {
          student: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "User",
          },

          fileLink: {
            type: String,
          },

          submittedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Assignment",
    assignmentSchema
  );