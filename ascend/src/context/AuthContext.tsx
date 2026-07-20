import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface Profile {
  id: string;
  name: string;
  email: string;
  xp: number;
  streak: number;
  level: number;
  dream_company: string;
  avatar_url: string;
  completed_modules: number;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateXP: (amount: number) => Promise<void>;
  updateStreak: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(data);
    setLoading(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
        xp: 0,
        streak: 0,
        level: 1,
        dream_company: "",
        avatar_url: "",
        completed_modules: 0,
      });
    }
    return { error: null };
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateXP = async (amount: number) => {
    if (!user || !profile) return;
    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    await supabase.from("profiles")
      .update({ xp: newXP, level: newLevel })
      .eq("id", user.id);
    setProfile(prev => prev ? { ...prev, xp: newXP, level: newLevel } : prev);

    // Update leaderboard
    await supabase.from("leaderboard").upsert({
      user_id: user.id,
      display_name: profile.name,
      total_xp: newXP,
      weekly_xp: amount,
    }, { onConflict: "user_id" });
  };

  const updateStreak = async () => {
    if (!user || !profile) return;
    const newStreak = profile.streak + 1;
    await supabase.from("profiles")
      .update({ streak: newStreak })
      .eq("id", user.id);
    setProfile(prev => prev ? { ...prev, streak: newStreak } : prev);
  };

  return (
    <AuthContext.Provider value={{
      session, user, profile, loading,
      signInWithEmail, signUpWithEmail, signInWithGoogle,
      signOut, updateXP, updateStreak
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
