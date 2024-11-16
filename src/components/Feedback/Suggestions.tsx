import React, { useState } from "react";
import SingleSuggestion from "./SingleSuggestion";
import { useAuth } from "@/contexts/AuthContext";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  allSuggestions: any;
  voteSuggestion: (id: number) => void;
}

const Suggestions = ({ allSuggestions, voteSuggestion }: Props) => {
  const { user } = useAuth();

  return (
    <div className=" basis-2/3 ">
      {allSuggestions?.length > 0
        ? allSuggestions.map((suggestion: any) => {
            return (
              <SingleSuggestion
                key={suggestion.id}
                title={suggestion.title}
                desc={suggestion.description}
                vote_cnt={suggestion.vote_counter}
                id={suggestion.id}
                hasVoted={suggestion.hasVoted}
                voteSuggestion={voteSuggestion}
              />
            );
          })
        : [1, 2, 3].map((skele: any) => {
            return (
              <div className="basis-1/2" key={skele}>
                <Skeleton style={{ height: "200px", marginTop: "-40px" }} />
              </div>
            );
          })}
    </div>
  );
};

export default Suggestions;
