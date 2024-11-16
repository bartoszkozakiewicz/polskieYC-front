import React from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface Props {
  title: string;
  desc: string;
  vote_cnt: number;
  id: number;
  hasVoted: boolean;
  voteSuggestion: (id: number) => void;
}

const SingleSuggestion = ({
  title,
  desc,
  vote_cnt,
  id,
  hasVoted,
  voteSuggestion,
}: Props) => {
  return (
    <div className="mb-6 basis-1/2">
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-row items-center justify-between p-7">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{title}</p>
            <p>{desc}</p>
          </div>
          <div
            className={`flex h-20 w-12 cursor-pointer flex-col items-center justify-around rounded-[10px] border ${
              hasVoted ? "border-blue-500 font-bold" : "border-gray-300"
            } transition-all duration-200`}
            onClick={() => voteSuggestion(id)}
          >
            <MdOutlineKeyboardArrowUp size={32} />
            <p className="pb-2 text-2xl">{vote_cnt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSuggestion;
