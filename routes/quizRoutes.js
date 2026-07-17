const express =
  require("express");

const {
  createQuiz,
  getQuiz,
  submitQuiz,
  getQuizResults
} = require(
  "../controllers/quizController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const router =
  express.Router();


// Create Quiz
router.post(
  "/create",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),
  createQuiz
);


// Get Quiz By Course ID
router.get(
  "/:id",
  getQuiz
);


// Submit Quiz
router.post(
  "/submit",
  protect,
  submitQuiz
);


// Get Quiz Results By Course ID
router.get(
  "/results/course/:courseId",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),
  getQuizResults
);


module.exports =
  router;