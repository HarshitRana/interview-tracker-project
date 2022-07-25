const { Router } = require("express");
const router = Router();

const { requireAuth } = require("../middleware/authMiddleware");
const contentController = require("../controllers/contentController");

router.get("/topic", requireAuth, contentController.topic_get);

router.get("/topic/:name", requireAuth, contentController.question_get);

router.delete("/topic/:id", requireAuth, contentController.question_delete);

router.get("/addquestion", requireAuth, contentController.Ques_get);

router.post("/addquestion", requireAuth, contentController.Ques_post);
module.exports = router;
