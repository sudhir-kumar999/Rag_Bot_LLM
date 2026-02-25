import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 md:px-10 py-4">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600"
          >
            NotebookLLM
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  👋 {user.name}
                </span>

                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-indigo-600 font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* DARK OVERLAY */}
          <div
            className="w-1/2 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDE DRAWER (HALF WIDTH) */}
          <div className="w-1/2 bg-white h-full shadow-xl p-6 flex flex-col gap-6 animate-slideIn">

            {/* CLOSE BUTTON */}
            <button
              className="text-2xl self-end"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {user ? (
              <>
                <span className="text-lg font-medium">
                  👋 {user.name}
                </span>

                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="border px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-indigo-600 font-semibold text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}