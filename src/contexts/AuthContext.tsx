import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  User,
  getIdToken,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";

interface AuthContextType {
  user: User | null | undefined;
  userDetails: any;
  loading: boolean;
  error: Error | undefined;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: { email: "", name: "" },
  loading: true,
  error: undefined,
  authLoading: false,
  loginWithGoogle: async () => {},
  loginWithEmail: async (email, password) => {},
  signUpWithEmail: async (email, password, name) => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [user, loading, error] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", name: "" });
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      setAuthLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google sign in:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      setUserDetails((prev) => ({ ...prev, email: email }));
      console.log("Login email");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
    } catch (error) {
      console.error("Error during email sign in:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const registerUserInDb = async (user: any) => {
    try {
      setUserDetails({ email: user.email, name: user.name });

      console.log("User in regiresterUserInDb", user);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setAuthLoading(true);
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("Registered user:", registeredUser);
      console.log("name: ", name);

      if (registeredUser?.user) {
        const user = {
          email: registeredUser.user.email,
          name: name,
          hasAccess: false,
          createdAt: new Date(),
          localId: registeredUser.user.uid,
        };

        await registerUserInDb(user);
        console.log("User registered in db");
      }
    } catch (error) {
      console.error("Error during email sign up:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("logout");
      setAuthLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const verifyUser = () => {
    if (user) {
      console.log("User verified");
    } else {
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        console.log("User: ", user);
        const id = await getIdToken(user);
        fetchWithInterceptors(
          process.env.NEXT_PUBLIC_URL + "user" + `?id=${user.uid}`,
          id,
        )
          .then((data: any) => {
            if (data) {
              setUserDetails(data);
            }
          })
          .catch((error: any) => console.error(error));
      }
    };
    getUserData();
  }, [user]);

  const value = {
    user,
    userDetails,
    loading,
    error,
    authLoading,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
