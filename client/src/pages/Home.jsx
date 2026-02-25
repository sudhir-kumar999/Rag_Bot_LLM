import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect logged-in user to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // ✅ Prevent UI flicker while checking auth
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-32">

        <h2 className="text-5xl font-extrabold leading-tight max-w-3xl">
          Chat With Your Documents Using AI
        </h2>

        <p className="mt-6 text-lg text-gray-200 max-w-xl">
          Upload PDFs, create notebooks, and ask questions powered
          by Gemini AI and RAG architecture.
        </p>

        <div className="mt-10 flex gap-6">
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-8 px-10 mt-28 pb-20">

        <Feature
          title="AI Powered Chat"
          desc="Ask questions from your uploaded documents instantly."
        />

        <Feature
          title="Smart Retrieval"
          desc="RAG-based semantic search for accurate answers."
        />

        <Feature
          title="Personal Workspace"
          desc="User-wise notebooks and private AI knowledge base."
        />

      </div>
    </div>
  );
}

// ✅ Feature Card Component
function Feature({ title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-200">{desc}</p>
    </div>
  );
}