import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { GeminiEmbeddings } from "./customEmbeddings.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const indexDocument = async (filePath, userId) => {
  try {
    console.log("📄 Loading PDF...");

    // LOAD PDF
    const loader = new PDFLoader(filePath);
    const rawDocs = await loader.load();

    console.log("Raw Docs:", rawDocs.length);

    // CHUNKING
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = await splitter.splitDocuments(rawDocs);

    console.log("Chunks:", chunkedDocs.length);

    // ✅ REMOVE EMPTY CHUNKS
    const validDocs = chunkedDocs.filter(
      (doc) => doc.pageContent?.trim().length > 0
    );

    console.log("Valid Docs:", validDocs.length);

    if (!validDocs.length) {
      throw new Error("No valid content extracted from PDF");
    }

    console.log("Valid Docs:", validDocs.length);
    console.log("Sample text:", validDocs[0]?.pageContent?.slice(0, 100));
    // EMBEDDINGS (Gemini)
    const embeddings = new GeminiEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-001",
      batchSize: 1
    });

    const testEmbedding = await embeddings.embedQuery(
  validDocs[0].pageContent
);

console.log("Embedding length:", testEmbedding.length);
    // PINECONE
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME);

    // ✅ USER-WISE NAMESPACE
    const namespace = `user-${userId}`;
    console.log(namespace);

    console.log("Uploading to Pinecone...");

    await PineconeStore.fromDocuments(validDocs, embeddings, {
      pineconeIndex,
      namespace,
      maxConcurrency: 5,
    });

    console.log("✅ Indexing Complete");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
