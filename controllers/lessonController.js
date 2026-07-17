const Lesson = require("../models/Lesson");

// Add Lesson
const addLesson = async (req, res) => {
  try {

    const {
      title,
      course
    } = req.body;

    const lesson =
      await Lesson.create({
        title,

        video:
          req.files.video
            ? "/" +
              req.files.video[0].path.replace(/\\/g, "/")
            : "",

        pdf:
          req.files.pdf
            ? "/" +
              req.files.pdf[0].path.replace(/\\/g, "/")
            : "",

        course
      });

    res.status(201).json(
      lesson
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get Lessons By Course
const getLessonsByCourse =
  async (req, res) => {
    try {

      const lessons =
        await Lesson.find({
          course:
            req.params.courseId
        });

      res.status(200).json(
        lessons
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };

module.exports = {
  addLesson,
  getLessonsByCourse
};