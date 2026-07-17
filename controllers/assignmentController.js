const Assignment =
  require("../models/Assignment");

// Create Assignment
const createAssignment =
  async (req, res) => {

    try {

      const {
        title,
        description,
        course
      } = req.body;

      const assignment =
        await Assignment.create({

          title,

          description,

          course

        });

      res.status(201).json(
        assignment
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// Get Assignments By Course
const getAssignments =
  async (req, res) => {

    try {

      const assignments =
        await Assignment.find({

          course:
            req.params.courseId

        });

      res.status(200).json(
        assignments
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// Submit Assignment
const submitAssignment =
  async (req, res) => {

    try {

      const {
        fileLink
      } = req.body;

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      if (!assignment) {

        return res.status(404).json({

          message:
            "Assignment not found"

        });

      }

      assignment.submissions.push({

        student:
          req.user._id,

        fileLink

      });

      await assignment.save();

      res.status(200).json({

        message:
          "Assignment Submitted Successfully"

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// View Assignment Submissions
const getSubmissions =
  async (req, res) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        ).populate(
          "submissions.student",
          "name email"
        );

      if (!assignment) {

        return res.status(404).json({

          message:
            "Assignment not found"

        });

      }

      res.status(200).json(
        assignment.submissions
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


module.exports = {

  createAssignment,

  getAssignments,

  submitAssignment,

  getSubmissions

};