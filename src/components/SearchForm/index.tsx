"use client";

import React from "react";
import CustomInput from "../FormElements/InputGroup/CustomInput";

const SearchForm = () => {
  return (
    <div className="basis-1/3">
      <div className="col-span-5 xl:col-span-3">
        <div className=" flex flex-col rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
            <h3 className="text-center text-xl font-medium text-dark dark:text-white">
              Fill the search form
            </h3>
          </div>
          <div className="flex flex-row gap-5 p-5">
            <CustomInput
              key_={""}
              val={""}
              valSetter={""}
              label={"Name"}
              placeholder="Write down your name"
            />
            <CustomInput
              key_={""}
              val={""}
              valSetter={""}
              label={"Surname"}
              placeholder="Write down your name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
