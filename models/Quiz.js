const mongoose =
  require("mongoose");

const questionSchema =
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },
  });

const quizSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },

      questions: [
        questionSchema,
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Quiz",
    quizSchema
  );