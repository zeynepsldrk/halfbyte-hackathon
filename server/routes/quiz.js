const express = require("express");
const router = express.Router();
// NOTE: This path assumes this file is in server/routes/ or similar relative to middleware
// If keeping in separate folder, adjust path accordingly.
// For now, pointing to the project root middleware.
const authMiddleware = require("../server/middleware/auth");

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  getMyQuizResults
} = require("./quiz.controller");

router.use(authMiddleware);

router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/:id/results", getQuizResults);
router.get("/:id/my-results", getMyQuizResults);

module.exports = router;
