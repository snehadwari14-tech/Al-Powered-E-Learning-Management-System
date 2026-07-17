const express =
  require("express");

const {
  createAssignment,
  getAssignments,
  submitAssignment,
  getSubmissions
} = require(
  "../controllers/assignmentController"
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


// Create Assignment
router.post(
  "/create",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),
  createAssignment
);


// Get Assignments By Course
router.get(
  "/:courseId",
  getAssignments
);


// Submit Assignment
router.post(
  "/submit/:id",
  protect,
  submitAssignment
);


// View Assignment Submissions
router.get(
  "/submissions/:id",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),
  getSubmissions
);


module.exports =
  router;