import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"
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
                
                if (user) {
                    setUser(user);
                    setUserType(user?.user_metadata?.user_type || 'customer');
                } else {
                    // IMPORTANT: Clear everything if no user
                    setUser(null);
                    setUserType(null);
                }
                
            } catch (error) {
                console.error('Error getting user:', error);
                setError(error.message);
                setUser(null);
                setUserType(null); // Changed from 'customer'
            } finally {
                setLoading(false);
            }
        };
        
        getUserType();
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);  
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