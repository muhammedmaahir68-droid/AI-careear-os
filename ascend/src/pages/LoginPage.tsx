import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await signInWithEmail(email, password);
      if (error) { setError(error); setLoading(false); }
      else navigate("/dashboard");
    } else {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      const { error } = await signUpWithEmail(email, password, name);
      if (error) { setError(error); setLoading(false); }
      else {
        setSuccessMsg("Account created! Check your email to confirm, then log in.");
        setMode("login");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center p-6 overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-2xl font-display">AI Career OS</span>
          </div>
          <p className="text-muted-foreground text-sm">Your journey from Zero to Placed starts here.</p>
        </div>

        <div className="p-8 rounded-3xl border border-border bg-black/40 backdrop-blur-xl">
          {/* Mode Toggle */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-6">
            <button
              onClick={() => { setMode("login"); setError(null); }}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "login" ? "bg-white text-black" : "text-muted-foreground"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(null); }}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "signup" ? "bg-white text-black" : "text-muted-foreground"}`}
            >
              Create Account
            </button>
          </div>

          {/* Success / Error */}
          <AnimatePresence>
            {successMsg && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                {successMsg}
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (signup only) */}
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-muted-foreground"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-border rounded-2xl py-3 pl-11 pr-11 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-muted-foreground"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">Please wait...</span>
              ) : (
                <>{mode === "login" ? "Sign In" : "Create Account"} <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google Login */}
          <motion.button
            onClick={signInWithGoogle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-border bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.83 15.483 1 12.24 1 6.01 1 1 6.01 1 12.24s5.01 11.24 11.24 11.24c6.5 0 10.822-4.57 10.822-11.015 0-.74-.08-1.3-.178-1.86H12.24z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            By continuing, you agree to our Terms of Service. Your data is stored securely.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
