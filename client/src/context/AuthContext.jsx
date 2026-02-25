import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ CHECK LOGIN STATUS (AUTO LOGIN)
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // app start pe run hoga
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ REGISTER
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    // setUser(res.data);
  };

  // ✅ LOGIN
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    setUser(res.data); // cookie already backend set karega
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setUser(null); // UI always reset
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
