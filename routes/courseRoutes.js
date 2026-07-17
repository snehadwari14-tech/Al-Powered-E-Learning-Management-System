const express =
  require("express");

const {
  createCourse,
  getCourses,
  deleteCourse,
} = require(
  "../controllers/courseController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const router =
  express.Router();

// Get All Courses
router.get(
  "/",
  getCourses
);

// Create Course
router.post(
  "/create",
  protect,
  authorizeRoles(
    "instructor",
    "admin"
  ),
  createCourse
);

// Delete Course
router.delete(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),
  deleteCourse
);

module.exports =
  router;