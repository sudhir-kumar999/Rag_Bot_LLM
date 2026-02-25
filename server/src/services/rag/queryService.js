import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export const askQuestion = async (question, userId) => {
  // embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    modelName: "gemini-embedding-001",
  });

  // pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

  const namespace = `user-${userId}`;

  // ✅ embed question
  const queryVector = await embeddings.embedQuery(question);

  // ✅ similarity search
  const searchResult = await index.namespace(namespace).query({
    topK: 5,
    vector: queryVector,
    includeMetadata: true,
  });

  const context = searchResult.matches
    .map((m) => m.metadata.text)
    .join("\n\n---\n\n");

  // LLM
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.3,
  });

  const prompt = PromptTemplate.fromTemplate(`
You are a helpful and professional AI assistant that answers questions using uploaded documents.

--------------------------------
BEHAVIOR RULES
--------------------------------
1. If the user sends a greeting (hello, hi, hey, good morning, etc.),
   respond with a polite greeting and ask how you can help.
   DO NOT use document context for greetings.

2. For questions:
   - Answer ONLY using the provided context.
   - Do NOT make up information.
   - If the answer is not present in the context, say:
     "I don't have enough information in the document."

3. Keep answers:
   - Clear
   - Well-written
   - Easy to understand
   - Concise but informative

4. If possible, summarize information naturally instead of copying text word-by-word.

--------------------------------
CONTEXT
--------------------------------
{context}

--------------------------------
USER QUESTION
--------------------------------
{question}

--------------------------------
ANSWER
--------------------------------
`);

  const chain = RunnableSequence.from([
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke({
    context,
    question,
  });
  // ✅ confidence score (0–100)
const confidence =
  searchResult.matches?.length > 0
    ? Math.round(searchResult.matches[0].score * 100)
    : 0;

  return {
  answer,
  confidence,
};
};