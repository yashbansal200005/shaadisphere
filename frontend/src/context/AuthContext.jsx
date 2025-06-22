import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  const [token, setToken] = useState(null);
  

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    // navigate('/'); useNavigate() may be used only in the context of a <Router> component.
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
