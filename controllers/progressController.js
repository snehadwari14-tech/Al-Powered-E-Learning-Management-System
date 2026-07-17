const Progress =
  require("../models/Progress");

const Lesson =
  require("../models/Lesson");

// Mark Lesson Complete
const completeLesson =
  async (req, res) => {
    try {

      const { lesson } =
        req.body;

      const exists =
        await Progress.findOne({
          student:
            req.user._id,
          lesson,
        });

      if (exists) {
        return res.status(400).json({
          message:
            "Lesson already completed",
        });
      }

      const progress =
        await Progress.create({
          student:
            req.user._id,
          lesson,
          completed: true,
        });

      res.status(201).json(
        progress
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// View Completed Lessons
const getCompletedLessons =
  async (req, res) => {
    try {

      const lessons =
        await Progress.find({
          student:
            req.user._id,
        }).populate(
          "lesson"
        );

      res.status(200).json(
        lessons
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  completeLesson,
  getCompletedLessons,
};