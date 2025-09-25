import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reusable checkUser function
  const checkUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        credentials: "include", // send cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    }
  }, []);

  // Check user on mount
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser: checkUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
