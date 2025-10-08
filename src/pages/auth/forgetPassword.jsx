import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sectionTypes = {
  email: "email",
  reset: "reset",
};

function ForgetPassword() {
  const navigate = useNavigate();
  const [section, setSection] = useState(sectionTypes.email);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Detect if user is coming back with recovery link
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSection(sectionTypes.reset);
        toast("Enter your new password");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle password recovery request (send email)
  async function handlePasswordRecovery(e) {
    e.preventDefault();
    if (!email) return toast.error("The email field is required.");

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // redirectTo: "http://localhost:5173/forgetpassword",

        redirectTo :("/forgetpassword")
        // setEmail("")
        
      });

      if (error) throw error;

      toast.success("Password recovery email sent! Check your inbox.");
    } catch (error) {
      console.error("Password recovery error:", error);
      toast.error(error.message || "Failed to send recovery email");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle password reset
  async function handlePasswordReset(e) {
    e.preventDefault();

    if (!passwords.newPassword || !passwords.confirmPassword) {
      return toast.error("Both password fields are required.");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      });

      if (error) throw error;

      toast.success("Password reset successful! You can now sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 h-screen flex flex-col items-center pt-[7em] gap-5">
      <div className="flex flex-col w-[34em]">
        {section === "email" && (
          <>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className="font-bold text-2xl">Forgot Password</h2>
              <p className="font-light">
                Enter email used to register your account
              </p>
            </div>
            <form
              onSubmit={handlePasswordRecovery}
              className="mt-6 rounded-lg flex flex-col gap-4"
            >
              <div>
                <label className="block text-[#333333] font-medium text-[1.1em] mb-2">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Recovery Email"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <NavLink
                to="/signin"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Back to Sign In
              </NavLink>
            </div>
          </>
        )}

        {section === "reset" && (
          <>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className="font-bold text-2xl">Reset Password</h2>
              <p className="font-light">Enter your new password</p>
            </div>
            <form
              onSubmit={handlePasswordReset}
              className="mt-6 rounded-lg flex flex-col gap-4"
            >
              <div>
                <label className="block text-[#333333] font-medium text-[1.1em] mb-2">
                  New Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  placeholder="Enter new password"
                  type="password"
                  name="newPassword"
                  required
                />

                <label className="block text-[#333333] font-medium text-[1.1em] mb-2">
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm new password"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
