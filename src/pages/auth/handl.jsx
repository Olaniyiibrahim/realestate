// import { supabase } from '../lib/supabase';
// Alternative: Using Supabase Client (Recommended)
// First install: npm install @supabase/supabase-js

// Then create src/lib/supabase.js:
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
// export const supabase = createClient(supabaseUrl, supabaseKey)

// And use this cleaner version:// Add these constants at the top of your component
// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     userType: 'customer' // 'customer' or 'agent'
// });
// const [showPassword, setShowPassword] = useState(false);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState('');
// const navigate = useNavigate();



// Alternative: Using Supabase Client (Recommended)
// First install: npm install @supabase/supabase-js

// Then create src/lib/supabase.js:
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
// export const supabase = createClient(supabaseUrl, supabaseKey)

// And use this cleaner version:
// const handleSubmitWithClient = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//         // Import supabase client at top: import { supabase } from '../lib/supabase';
        
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email: formData.email,
//             password: formData.password
//         });

//         if (error) throw error;

//         const userData = {
//             id: data.user.id,
//             name: data.user.user_metadata?.name || data.user.email,
//             email: data.user.email,
//             phone: data.user.user_metadata?.phone,
//             type: data.user.user_metadata?.user_type || 'customer',
//             agency_name: data.user.user_metadata?.agency_name,
//             license_number: data.user.user_metadata?.license_number
//         };

//         toast.success(`Welcome back, ${userData.name}!`);

//         // Redirect based on user type
//         if (userData.type === 'agent') {
//             navigate('/dashboard/agent');
//         } else {
//             navigate('/dashboard/customer');
//         }

//     } catch (err) {
//         console.error('Sign in error:', err);
//         setError(err.message || 'Sign in failed. Please check your credentials.');
//         toast.error(err.message || 'Sign in failed');
//     } finally {
//         setLoading(false);
//     }
// };