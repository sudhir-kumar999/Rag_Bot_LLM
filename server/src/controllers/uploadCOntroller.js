import { indexDocument } from "../services/rag/indexingServices.js";

export const uploadDocument = async (req, res) => {
  try {
    const filePath = req.file.path;
    const userId = req.user._id;

    await indexDocument(filePath, userId);

    res.json({
      message: "Document uploaded & indexed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};