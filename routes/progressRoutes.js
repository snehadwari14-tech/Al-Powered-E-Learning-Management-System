const express =
  require("express");

const {
  completeLesson,
  getCompletedLessons,
} = require(
  "../controllers/progressController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/complete",
  protect,
  completeLesson
);

router.get(
  "/completed",
  protect,
  getCompletedLessons
);

module.exports =
  router;