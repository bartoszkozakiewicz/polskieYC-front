"use client";

import React, { useState } from "react";
import CustomTextArea from "../FormElements/InputGroup/CustomTextArea";
import CustomCheckbox from "../FormElements/Checkboxes/CustomCheckbox";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";
import { useAuth } from "@/contexts/AuthContext";
import { getIdToken } from "firebase/auth";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const { user } = useAuth();
  const router = useRouter();

  // -- USE STATES --
  const [searchType, setSearchType] = useState<string>("");
  const [reqs, setReqs] = useState<string>("");

  // -- FUNCTIONS --
  const handleSetSearchType = (label: string) => {
    setSearchType(label);
  };

  const handleSearchResults = async () => {
    if (user) {
      const tokenId = await getIdToken(user);

      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "custom_search",
        tokenId,
        "POST",
        { reqs: reqs, type: searchType, userId: user.uid },
      )
        .then((data: any) => {
          router.push("/settings");
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  const handleSaveReqs = (key: string, val: string) => {
    setReqs(val);
  };

  console.log("Reqs: ", reqs);

  return (
    <div className="basis-1/3">
      <div className="col-span-5 xl:col-span-3">
        <div className=" flex flex-col rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
            <h3 className="text-center text-xl font-medium text-dark dark:text-white">
              Fill the search form
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 p-5">
            <div className="flex w-[100%] flex-row justify-around">
              <CustomCheckbox
                label={"Venture Capital"}
                isChecked={searchType == "Venture Capital"}
                setSearchType={handleSetSearchType}
              />
              <CustomCheckbox
                label={"Researchers"}
                isChecked={searchType == "Researchers"}
                setSearchType={handleSetSearchType}
              />
              <CustomCheckbox
                label={"Businesses"}
                isChecked={searchType == "Businesses"}
                setSearchType={handleSetSearchType}
              />
            </div>
            <CustomTextArea
              key_={""}
              val={reqs}
              valSetter={handleSaveReqs}
              label={"Requirements"}
              placeholder="Write down your requirements accoring to project, business or whatever you are looking for. Greater details can give you better results."
            />
            <button
              onClick={handleSearchResults}
              className="h-[40px] w-[100%] rounded-md bg-[#5750F1] text-xl font-bold text-white "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
