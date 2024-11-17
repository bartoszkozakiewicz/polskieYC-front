import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Signup from "@/components/Auth/Signup";

export const metadata: Metadata = {
  title: "NerdNet SignUp page",
  description: "This is NerdNet SignUp page",
};

const SignUp: React.FC = () => {
  return (
    <div className="mx-auto max-h-[95vh] max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signup />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <p className="mb-10 text-2xl font-bold">NerdNet</p>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Please sign in to your account by completing the necessary
                fields below
              </p>
              <div className="">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={300}
                  height={20}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
