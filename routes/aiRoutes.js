const express =
  require("express");

const {
  askTutor,
  generateSummary,
  generateQuiz,
} = require(
  "../controllers/aiController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

// AI Tutor
router.post(
  "/tutor",
  protect,
  askTutor
);

// AI Summary Generator
router.post(
  "/summary",
  protect,
  generateSummary
);

// AI Quiz Generator
router.post(
  "/quiz",
  protect,
  generateQuiz
);

module.exports =
  router;