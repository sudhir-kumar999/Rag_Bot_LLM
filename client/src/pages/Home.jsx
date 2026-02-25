import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

export default function Home() {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">

      {/* NAVBAR */}
      {/* <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          NotebookLLM
        </h1>

        <div className="space-x-4">

          {user ? (
            <>
              <span className="font-semibold">
                👋 {user.name}
              </span>

              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-200 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-indigo-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-indigo-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </nav> */}

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 ">

        <h2 className="text-5xl font-extrabold leading-tight max-w-3xl">
          Chat With Your Documents Using AI
        </h2>

        <p className="mt-6 text-lg text-gray-200 max-w-xl">
          Upload PDFs, create notebooks, and ask questions
          powered by Gemini AI and RAG architecture.
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

function Feature({ title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-200">{desc}</p>
    </div>
  );
}