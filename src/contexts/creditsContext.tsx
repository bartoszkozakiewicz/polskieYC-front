import { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { PrismaClient } from "@prisma/client";
import { getIdToken } from "firebase/auth";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";

const prisma = new PrismaClient();

interface CreditsContextType {
  credits: number;
  setRefreshCredits?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreditsContext = createContext<CreditsContextType>({
  credits: 0,
  setRefreshCredits: () => {},
});
export const useCredits = () => useContext(CreditsContext);

export const CreditsProvider = ({ children }: any) => {
  const [user, loading, error] = useAuthState(auth);

  const [credits, setCredits] = useState<number>(0);
  const [refreshCredits, setRefreshCredits] = useState<boolean>(false);

  const fetchCredits = async () => {
    if (user) {
      const id = await getIdToken(user);
      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "user" + `?id=${user.uid}`,
        id,
      )
        .then((data: any) => {
          if (data) {
            console.log("Fetching credentials: ", data?.credentials);
            setCredits(data?.credentials);
          }
        })
        .catch((error: any) => console.error(error));
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  useEffect(() => {
    if (refreshCredits) {
      fetchCredits();
      setRefreshCredits(false);
    }
  }, [refreshCredits]);

  const value = {
    credits,
    setRefreshCredits,
  };

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
};
