"use client";

import React, { useState } from "react";
import CustomInput from "../FormElements/InputGroup/CustomInput";
import CustomTextArea from "../FormElements/InputGroup/CustomTextArea";
import { useRouter } from "next/navigation";

interface UserForm {
  name: string;
  surname: string;
  linkedin: string;
  scholar: string;
  introduction: string;
  accomplishments: string;
  education: string;
}

const ProfileForm = () => {
  const router = useRouter();
  const [userForm, setUserForm] = useState<UserForm>({
    name: "a",
    surname: "",
    linkedin: "",
    scholar: "",
    introduction: "",
    accomplishments: "",
    education: "",
  });

  // -- FUNCTIONS --

  const handleSaveUserForm = async () => {
    console.log("User in regiresterUserInDb", userForm);
    const response = await fetch("/api/user_form", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    });
    console.log("Res: ", response);
    router.push("/settings");
  };

  const updateForm = (key: string, val: string) => {
    console.log("Update form: ", key, val);
    setUserForm((prev: UserForm) => ({
      ...prev,
      [key]: val,
    }));
  };

  console.log("form: ", userForm, userForm["name"]);
  console.log("name: ", userForm.name);

  return (
    <div className="m-auto w-[50%] p-4 text-center text-2xl font-semibold text-black">
      <p className="mb-4">Fill form about you</p>
      <div className="col-span-5 text-base font-normal xl:col-span-3">
        <div className="flex flex-col gap-4 rounded-[10px] border border-stroke bg-white p-4 text-left shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <CustomInput
            val={userForm.name}
            key_={"name"}
            valSetter={updateForm}
            label={"Name"}
            placeholder="Write down your name"
          />
          <CustomInput
            val={userForm.surname}
            key_={"surname"}
            valSetter={updateForm}
            label={"Surname"}
            placeholder="Write down your surname"
          />
          <CustomInput
            val={userForm.linkedin}
            key_={"linkedin"}
            valSetter={updateForm}
            label={"Linkedin profile"}
            placeholder="Paste link to your Linkedin profile"
          />
          <CustomInput
            val={userForm.scholar}
            key_={"scholar"}
            valSetter={updateForm}
            label={"Google Scholar"}
            placeholder="Paste link to your Google Scholar profile"
          />
          <CustomTextArea
            val={userForm.introduction}
            key_={"introduction"}
            valSetter={updateForm}
            label={"Introduce yourrself"}
            placeholder="Write about your background and what are you are looking for. Cover your professional accomplishments and interests."
          />
          <CustomTextArea
            val={userForm.accomplishments}
            key_={"accomplishments"}
            valSetter={updateForm}
            label={"Impressive accomplishment"}
            placeholder="Some academic or professional achievement, an award you've won, or something impressive you've built."
          />
          <CustomTextArea
            val={userForm.education}
            key_={"education"}
            valSetter={updateForm}
            label={"Education"}
            placeholder="Schools, degrees (including field of study), and years of grafuation. Use a seperate line for each school."
          />

          <button
            onClick={() => handleSaveUserForm()}
            className=" h-[40px] rounded-md bg-[#5750F1] text-xl font-bold text-white "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
