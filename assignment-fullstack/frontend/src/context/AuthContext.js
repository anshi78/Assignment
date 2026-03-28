"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set default axios header
  axios.defaults.baseURL = "http://localhost:5050/api/v1";

  useEffect(() => {
    // Check localStorage only on client
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      fetchUser();
    } else if (token === null && !loading) {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setToken(null); // Invalid token
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password, role) => {
    const res = await axios.post("/auth/register", { name, email, password, role });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, token }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
