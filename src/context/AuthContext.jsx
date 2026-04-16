import { createContext, useContext, useState, useEffect } from "react";
import checkSession from "../services/session";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await checkSession();

      if (data?.activeSession) {
        setUser(data.user); // aquí guardas todo el user
      }

      setLoading(false);
    };

    fetchSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}