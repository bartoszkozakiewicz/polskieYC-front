"use client";

import React, { useEffect, useState } from "react";
import SuggestionBox from "./SuggestionBox";
import Suggestions from "./Suggestions";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

const Feedback = () => {
  const { user } = useAuth();
  const [suggestion, setSuggestion] = useState({
    title: "",
    description: "",
  });
  const [allSuggestions, setAllSuggestions] = useState<any[]>([]);

  // ---- FUNCTIONS -----

  const updateClientSideSuggestions = (sugId: number) => {
    setAllSuggestions((prev: any) => {
      return prev.map((suggestion: any) => {
        if (suggestion.id == sugId) {
          return {
            ...suggestion,
            hasVoted: !suggestion.hasVoted,
            vote_counter: suggestion.hasVoted
              ? suggestion.vote_counter - 1
              : suggestion.vote_counter + 1,
          };
        }
        return suggestion;
      });
    });
  };

  const voteSuggestion = async (id: number) => {
    if (user) {
      const tokenId = await getIdToken(user);
      const prevAllSuggestions = allSuggestions;
      updateClientSideSuggestions(id);

      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "suggestions",
        tokenId,
        "PATCH",
        { suggestionId: id, userId: user.uid },
      )
        .then((data: any) => {
          console.log(data);
        })
        .catch((error: any) => {
          console.error(error);
          setAllSuggestions(prevAllSuggestions);
        });
    }
  };

  const addSuggestion = async () => {
    if (user) {
      console.log("Adding suggestion");
      const id = await getIdToken(user);

      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "suggestions",
        id,
        "POST",
        { suggestion: { authorId: user.uid, ...suggestion } },
      )
        .then((data: any) => {
          console.log(data.suggestion);
          setSuggestion({ title: "", description: "" });
          setAllSuggestions((prev: any) => {
            return [...prev, data.suggestion];
          });
        })
        .catch((error: any) => console.error(error));
    }
  };

  const getAllSuggestions = async () => {
    if (user) {
      const id = await getIdToken(user);
      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "suggestions" + `?id=${user.uid}`,
        id,
      )
        .then((data: any) => setAllSuggestions(data.suggestions))
        .catch((error: any) => console.error(error));
    }
  };

  // ---- USE EFFECTS -----
  useEffect(() => {
    getAllSuggestions();

    const intervalId = setInterval(getAllSuggestions, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row gap-6">
      <SuggestionBox
        suggestion={suggestion}
        setSuggestion={setSuggestion}
        addSuggestion={addSuggestion}
      />
      <Suggestions
        allSuggestions={allSuggestions}
        voteSuggestion={voteSuggestion}
      />
    </div>
  );
};

export default Feedback;
