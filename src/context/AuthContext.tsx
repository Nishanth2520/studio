"use client";

import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import type { ReactNode} from "react";
import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

export type UserRole = "user" | "doctor" | null;

interface AuthContextType {
  user: FirebaseUser | null;
  role: UserRole;
  loading: boolean;
  login: (firebaseUser: FirebaseUser, userRole: UserRole) => void;
  logout: () => Promise<void>;
  setRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const ROLE_STORAGE_KEY = "mediconsult_user_role";

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRoleState] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Try to load role from localStorage
        const storedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
        if (storedRole) {
          setRoleState(storedRole);
        } else {
          // If no role, but user exists, this is an edge case.
          // Forcing logout or setting a default role might be options.
          // For now, we'll clear role, which might prompt re-login or role selection.
          setRoleState(null); 
          console.warn("User authenticated but no role found in localStorage.");
        }
      } else {
        setUser(null);
        setRoleState(null);
        localStorage.removeItem(ROLE_STORAGE_KEY);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (firebaseUser: FirebaseUser, userRole: UserRole) => {
    setUser(firebaseUser);
    setRoleState(userRole);
    localStorage.setItem(ROLE_STORAGE_KEY, userRole);
    toast({ title: "Login Successful", description: `Welcome, ${userRole}!` });
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setRoleState(null);
      localStorage.removeItem(ROLE_STORAGE_KEY);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push("/login"); // Ensure redirection to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast({ title: "Logout Failed", description: "Could not log you out. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    } else {
      localStorage.removeItem(ROLE_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
