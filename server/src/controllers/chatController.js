import { askQuestion } from "../services/rag/queryService.js";

export const chatWithDocs = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user._id;

    if (!question) {
      return res.status(400).json({
        message: "Question required",
      });
    }

    // const answer = await askQuestion(question, userId);
    const result = await askQuestion(question, userId);

res.json({
  answer: result.answer,
  confidence: result.confidence,
});
    res.json({
  answer: result.answer,
  confidence: result.confidence,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};