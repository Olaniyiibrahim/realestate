import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"

const useUserType = () => {
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let mounted = true;
        let subscription;

        const getUserType = async () => {
            try {
                if (!mounted) return;
                
                setLoading(true);
                setError(null);
                
                console.log('🔄 Getting user type...');
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                
                if (userError) {
                    console.error('❌ getUser error:', userError);
                    throw userError;
                }
                
                console.log('👤 User found:', user?.email);
                console.log('📝 User metadata:', user?.user_metadata);
                
                if (user && mounted) {
                    setUser(user);
                    // Use both possible locations for user_type
                    const type = user?.user_metadata?.user_type || 
                                user?.app_metadata?.user_type || 
                                'customer';
                    setUserType(type);
                    console.log('✅ User type set to:', type);
                } else if (mounted) {
                    console.log('🚫 No user found, clearing state');
                    setUser(null);
                    setUserType(null);
                }
                
            } catch (err) {
                console.error('💥 Error in getUserType:', err);
                if (mounted) {
                    setError(err.message);
                    setUser(null);
                    setUserType(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };
        
        getUserType();
        
        // Listen for auth state changes
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('🎯 Auth state changed:', event, session?.user?.email);
                
                if (!mounted) return;
                
                try {
                    if (event === 'SIGNED_IN' && session?.user) {
                        console.log('🔐 User signed in:', session.user.email);
                        setUser(session.user);
                        const type = session.user.user_metadata?.user_type || 
                                    session.user.app_metadata?.user_type || 
                                    'customer';
                        setUserType(type);
                        setError(null);
                    } else if (event === 'SIGNED_OUT') {
                        console.log('🚪 User signed out');
                        setUser(null);
                        setUserType(null);
                        setError(null);
                    } else if (event === 'USER_UPDATED') {
                        console.log('📝 User updated, refreshing...');
                        // Refresh user data
                        const { data: { user: updatedUser } } = await supabase.auth.getUser();
                        if (updatedUser && mounted) {
                            setUser(updatedUser);
                            const type = updatedUser.user_metadata?.user_type || 
                                        updatedUser.app_metadata?.user_type || 
                                        'customer';
                            setUserType(type);
                        }
                    } else if (event === 'TOKEN_REFRESHED') {
                        console.log('🔄 Token refreshed');
                    }
                } catch (err) {
                    console.error('💥 Error in auth state change:', err);
                    if (mounted) {
                        setError(err.message);
                    }
                }
            }
        );

        subscription = authSubscription;

        return () => {
            console.log('🧹 Cleaning up useUserType hook');
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    return { 
        userType, 
        user, 
        loading, 
        error,
        isAgent: userType === 'agent',
        isCustomer: userType === 'customer',
        isAuthenticated: !!user
    };
};

export default useUserType;