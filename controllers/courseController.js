const Course =
  require("../models/Course");


// Create Course
const createCourse =
  async (req, res) => {

    try {

      const {

        title,

        description,

        category,

        price

      } = req.body;


      const course =
        await Course.create({

          title,

          description,

          category,

          price,

          instructor:
            req.user._id

        });


      res.status(201).json(
        course
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



// Get All Courses
const getCourses =
  async (req, res) => {

    try {

      const courses =
        await Course.find();

      res.status(200).json(
        courses
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



// Delete Course
const deleteCourse =
  async (req, res) => {

    try {

      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {

        return res.status(404).json({

          message:
            "Course not found"

        });

      }

      await Course.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        message:
          "Course Deleted Successfully"

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



module.exports = {

  createCourse,

  getCourses,

  deleteCourse

};