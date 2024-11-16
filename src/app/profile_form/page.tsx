import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import ProfileForm from "@/components/ProfileForm";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <ProfileForm />
    </div>
  );
};

export default page;
