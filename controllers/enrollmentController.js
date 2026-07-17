const Enrollment =
  require("../models/Enrollment");

// Enroll Student
const enrollCourse =
  async (req, res) => {
    try {

      const { course } =
        req.body;

      const alreadyEnrolled =
        await Enrollment.findOne({
          student:
            req.user._id,
          course,
        });

      if (
        alreadyEnrolled
      ) {
        return res.status(400).json({
          message:
            "Already Enrolled",
        });
      }

      const enrollment =
        await Enrollment.create({
          student:
            req.user._id,
          course,
        });

      res.status(201).json(
        enrollment
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// View My Courses
const getMyCourses =
  async (req, res) => {
    try {

      const courses =
        await Enrollment.find({
          student:
            req.user._id,
        }).populate(
          "course"
        );

      res.status(200).json(
        courses
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  enrollCourse,
  getMyCourses,
};