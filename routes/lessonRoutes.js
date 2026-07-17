const express =
  require("express");

const {
  addLesson,
  getLessonsByCourse,
} = require(
  "../controllers/lessonController"
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

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const router =
  express.Router();

router.post(
  "/add",
  protect,
  authorizeRoles(
    "admin",
    "instructor"
  ),

  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),

  addLesson
);

router.get(
  "/:courseId",
  getLessonsByCourse
);

module.exports =
  router;