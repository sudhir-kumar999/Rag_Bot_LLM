import { GoogleGenerativeAI } from "@google/generative-ai";
import { Embeddings } from "@langchain/core/embeddings";

export class GeminiEmbeddings extends Embeddings {
  constructor(fields) {
    super(fields ?? {});
    const apiKey = fields?.apiKey || process.env.GEMINI_API_KEY;
    const modelName = fields?.modelName || "gemini-embedding-001";
    
    this.client = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      model: modelName,
    });
  }

  async embedQuery(text) {
    const cleanText = text.replace(/\n/g, " ");
    const result = await this.client.embedContent({
      content: { role: "user", parts: [{ text: cleanText }] },
    });
    return result.embedding.values ?? [];
  }

  async embedDocuments(documents) {
    const embeddings = [];
    for (const doc of documents) {
      const embedding = await this.embedQuery(doc);
      embeddings.push(embedding);
    }
    return embeddings;
  }
}