// src/hooks/useUserType.js
import { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase" // Adjust import path

const useUserType = () => {
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getUserType = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const { data: { user }, error } = await supabase.auth.getUser();
                
                if (error) throw error;
                
                setUser(user);
                setUserType(user?.user_metadata?.user_type || 'customer');
                
            } catch (error) {
                console.error('Error getting user:', error);
                setError(error.message);
                setUserType('customer'); // Default fallback
            } finally {
                setLoading(false);
            }
        };
        
        getUserType();
        
        // Optional: Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser(session.user);
                setUserType(session.user.user_metadata?.user_type || 'customer');
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setUserType(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { 
        userType, 
        user, 
        loading, 
        error,
        isAgent: userType === 'agent',
        isCustomer: userType === 'customer'
    };
};

export default useUserType;