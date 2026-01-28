import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAdmin({ token }); // minimal state
    }
    setLoading(false);
  }, []);

  // 🔹 LOGIN (uses backend)
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setAdmin(res.data.admin);
      return true;
    } catch (err) {
      return false;
    }
  };

  // 🔹 REGISTER (uses backend)
  const register = async (email, password, name) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // ❗ After register, DO NOT auto-login blindly
      return true;
    } catch (err) {
      return false;
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        register,
        logout,
        isAuthenticated: !!admin,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { AdminUser } from '@/types/certificate';

// interface AuthContextType {
//   user: AdminUser | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   register: (email: string, password: string, name: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<AdminUser | null>(null);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Mock API call - replace with actual API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (email && password) {
//       setUser({
//         id: '1',
//         email,
//         name: email.split('@')[0],
//       });
//       return true;
//     }
//     return false;
//   };

//   const register = async (email: string, password: string, name: string): Promise<boolean> => {
//     // Mock API call - replace with actual API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (email && password && name) {
//       setUser({
//         id: '1',
//         email,
//         name,
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
// // // // import React, {
// // // //   createContext,
// // // //   useContext,
// // // //   useEffect,
// // // //   useState,
// // // //   ReactNode,
// // // // } from 'react';
// // // // import axios from 'axios';
// // // // import { AdminUser } from '@/types/certificate';

// // // // interface AuthContextType {
// // // //   user: AdminUser | null;
// // // //   isAuthenticated: boolean;
// // // //   login: (email: string, password: string) => Promise<boolean>;
// // // //   register: (email: string, password: string, name: string) => Promise<boolean>;
// // // //   logout: () => void;
// // // // }

// // // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // // // Axios instance
// // // // const API = axios.create({
// // // //   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
// // // // });

// // // // // Attach token automatically
// // // // API.interceptors.request.use(config => {
// // // //   const token = localStorage.getItem('token');
// // // //   if (token) {
// // // //     config.headers.Authorization = `Bearer ${token}`;
// // // //   }
// // // //   return config;
// // // // });

// // // // export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// // // //   const [user, setUser] = useState<AdminUser | null>(null);

// // // //   // 🔁 Restore session on refresh
// // // //   useEffect(() => {
// // // //     const storedUser = localStorage.getItem('adminUser');
// // // //     if (storedUser) {
// // // //       setUser(JSON.parse(storedUser));
// // // //     }
// // // //   }, []);

// // // //   // 🔐 LOGIN
// // // //   const login = async (email: string, password: string): Promise<boolean> => {
// // // //     try {
// // // //       const res = await API.post('/auth/login', { email, password });

// // // //       const token = res.data.token;

// // // //       const adminUser: AdminUser = {
// // // //         id: 'admin',
// // // //         email,
// // // //         name: email.split('@')[0], // backend doesn’t return name yet
// // // //       };

// // // //       localStorage.setItem('token', token);
// // // //       localStorage.setItem('adminUser', JSON.stringify(adminUser));

// // // //       setUser(adminUser);
// // // //       return true;
// // // //     } catch (error) {
// // // //       console.error('Login failed', error);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   // 📝 REGISTER
// // // //   const register = async (
// // // //     email: string,
// // // //     password: string,
// // // //     name: string
// // // //   ): Promise<boolean> => {
// // // //     try {
// // // //       await API.post('/auth/register', {
// // // //         name,
// // // //         email,
// // // //         password,
// // // //       });

// // // //       // Auto-login after register (optional but nice UX)
// // // //       return await login(email, password);
// // // //     } catch (error) {
// // // //       console.error('Registration failed', error);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   // 🚪 LOGOUT
// // // //   const logout = () => {
// // // //     localStorage.removeItem('token');
// // // //     localStorage.removeItem('adminUser');
// // // //     setUser(null);
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider
// // // //       value={{
// // // //         user,
// // // //         isAuthenticated: !!user,
// // // //         login,
// // // //         register,
// // // //         logout,
// // // //       }}
// // // //     >
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };
// // // // const login = async (email: string, password: string): Promise<boolean> => {
// // // //   try {
// // // //     const res = await API.post('/admin/login', { email, password });
// // // //     const token = res.data.token;

// // // //     const adminUser: AdminUser = {
// // // //       id: 'admin',
// // // //       email,
// // // //       name: res.data.name || email.split('@')[0],
// // // //     };

// // // //     localStorage.setItem('token', token);
// // // //     localStorage.setItem('adminUser', JSON.stringify(adminUser));
// // // //     setUser(adminUser);
// // // //     return true;
// // // //   } catch {
// // // //     return false;
// // // //   }
// // // // };

// // // // const register = async (email: string, password: string, name: string): Promise<boolean> => {
// // // //   try {
// // // //     await API.post('/admin/register', { name, email, password });
// // // //     return await login(email, password);
// // // //   } catch {
// // // //     return false;
// // // //   }
// // // // };
// // // // export const useAuth = () => {
// // // //   const context = useContext(AuthContext);
// // // //   if (!context) {
// // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // //   }
// // // //   return context;
// // // // };
// // // // // src/context/AuthContext.tsx
// // // // // import React, { createContext, useContext, useState, useCallback } from 'react';

// // // // // interface AuthContextType {
// // // // //   isAuthenticated: boolean;
// // // // //   login: (token: string) => void;
// // // // //   logout: () => void;
// // // // //   checkAuth: () => Promise<void>;
// // // // // }

// // // // // const AuthContext = createContext<AuthContextType>({
// // // // //   isAuthenticated: false,
// // // // //   login: () => {},
// // // // //   logout: () => {},
// // // // //   checkAuth: async () => {},
// // // // // });

// // // // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // // // //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// // // // //   const login = (token: string) => {
// // // // //     localStorage.setItem('adminToken', token);
// // // // //     setIsAuthenticated(true);
// // // // //   };

// // // // //   const logout = () => {
// // // // //     localStorage.removeItem('adminToken');
// // // // //     setIsAuthenticated(false);
// // // // //   };

// // // // //   const checkAuth = useCallback(async () => {
// // // // //     const token = localStorage.getItem('adminToken');
// // // // //     if (!token) {
// // // // //       setIsAuthenticated(false);
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Optional: call backend to verify token
// // // // //       // await API.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
// // // // //       setIsAuthenticated(true);
// // // // //     } catch (err) {
// // // // //       setIsAuthenticated(false);
// // // // //       localStorage.removeItem('adminToken');
// // // // //     }
// // // // //   }, []);

// // // // //   return (
// // // // //     <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // };

// // // // // export const useAuth = () => useContext(AuthContext);
// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useEffect,
// // //   useState,
// // //   ReactNode,
// // // } from 'react';
// // // import API from '@/services/api';
// // // import { AdminUser } from '@/types/certificate';

// // // interface AuthContextType {
// // //   user: AdminUser | null;
// // //   isAuthenticated: boolean;
// // //   login: (email: string, password: string) => Promise<boolean>;
// // //   register: (email: string, password: string, name: string) => Promise<boolean>;
// // //   logout: () => void;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// // //   const [user, setUser] = useState<AdminUser | null>(null);

// // //   // 🔁 Restore session on refresh
// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem('adminUser');
// // //     const token = localStorage.getItem('token');

// // //     if (storedUser && token) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   // 🔐 LOGIN
// // //   const login = async (email: string, password: string): Promise<boolean> => {
// // //     try {
// // //       const res = await API.post('/admin/login', { email, password });

// // //       const token = res.data.token;
// // //       if (!token) return false;

// // //       const adminUser: AdminUser = {
// // //         id: res.data.id || 'admin',
// // //         email,
// // //         name: res.data.name || email.split('@')[0],
// // //       };

// // //       localStorage.setItem('token', token);
// // //       localStorage.setItem('adminUser', JSON.stringify(adminUser));
// // //       setUser(adminUser);

// // //       return true;
// // //     } catch (error) {
// // //       console.error('Login failed', error);
// // //       return false;
// // //     }
// // //   };

// // //   // 📝 REGISTER
// // //   const register = async (
// // //     email: string,
// // //     password: string,
// // //     name: string
// // //   ): Promise<boolean> => {
// // //     try {
// // //       await API.post('/admin/register', { name, email, password });

// // //       // Auto login after successful register
// // //       return await login(email, password);
// // //     } catch (error) {
// // //       console.error('Registration failed', error);
// // //       return false;
// // //     }
// // //   };

// // //   // 🚪 LOGOUT
// // //   const logout = () => {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('adminUser');
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         user,
// // //         isAuthenticated: !!user,
// // //         login,
// // //         register,
// // //         logout,
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error('useAuth must be used within an AuthProvider');
// // //   }
// // //   return context;
// // // };
// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { AdminUser } from '@/types/certificate';

// interface AuthContextType {
//   user: AdminUser | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   register: (email: string, password: string, name: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<AdminUser | null>(null);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Mock API call - replace with actual API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (email && password) {
//       setUser({
//         id: '1',
//         email,
//         name: email.split('@')[0],
//       });
//       return true;
//     }
//     return false;
//   };

//   const register = async (email: string, password: string, name: string): Promise<boolean> => {
//     // Mock API call - replace with actual API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (email && password && name) {
//       setUser({
//         id: '1',
//         email,
//         name,
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
//  };
// // import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import { AdminUser } from '@/types/certificate';
// // import { authAPI } from '@/lib/api';

// // interface AuthContextType {
// //   user: AdminUser | null;
// //   isAuthenticated: boolean;
// //   isLoading: boolean;
// //   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
// //   register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<AdminUser | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Check for existing token on mount
// //   useEffect(() => {
// //     const token = localStorage.getItem('adminToken');
// //     const storedUser = localStorage.getItem('adminUser');
    
// //     if (token && storedUser) {
// //       try {
// //         setUser(JSON.parse(storedUser));
// //       } catch {
// //         localStorage.removeItem('adminToken');
// //         localStorage.removeItem('adminUser');
// //       }
// //     }
// //     setIsLoading(false);
// //   }, []);

// //   const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
// //     try {
// //       const response = await authAPI.login({ email, password });
// //       const { token, admin } = response.data;
      
// //       // Store token and user data
// //       localStorage.setItem('adminToken', token);
// //       localStorage.setItem('adminUser', JSON.stringify(admin));
      
// //       setUser({
// //         id: admin._id || admin.id,
// //         email: admin.email,
// //         name: admin.name,
// //       });
      
// //       return { success: true };
// //     } catch (error: any) {
// //       const message = error.response?.data?.message || 'Login failed. Please try again.';
// //       return { success: false, error: message };
// //     }
// //   };

// //   const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
// //     try {
// //       const response = await authAPI.register({ name, email, password });
// //       const { token, admin } = response.data;
      
// //       // Store token and user data
// //       localStorage.setItem('adminToken', token);
// //       localStorage.setItem('adminUser', JSON.stringify(admin));
      
// //       setUser({
// //         id: admin._id || admin.id,
// //         email: admin.email,
// //         name: admin.name,
// //       });
      
// //       return { success: true };
// //     } catch (error: any) {
// //       const message = error.response?.data?.message || 'Registration failed. Please try again.';
// //       return { success: false, error: message };
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('adminToken');
// //     localStorage.removeItem('adminUser');
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };