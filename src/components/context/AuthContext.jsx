// // context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     // Get initial session
//     const getInitialSession = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
//         if (mounted && session?.user) {
//           setUser({
//             id: session.user.id,
//             email: session.user.email,
//             type: session.user.user_metadata?.user_type || 'customer'
//           });
//         }
//       } catch (error) {
//         console.error('Error getting session:', error);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     getInitialSession();

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log('Auth event:', event);
        
//         if (!mounted) return;

//         if (event === 'SIGNED_IN' && session?.user) {
//           setUser({
//             id: session.user.id,
//             email: session.user.email,
//             type: session.user.user_metadata?.user_type || 'customer'
//           });
//         } else if (event === 'SIGNED_OUT') {
//           setUser(null);
//         }
//       }
//     );

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
    
//     if (error) throw error;
//     return data;
//   };

//   const logout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user,
//     isAgent: user?.type === 'agent',
//     isCustomer: user?.type === 'customer'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };