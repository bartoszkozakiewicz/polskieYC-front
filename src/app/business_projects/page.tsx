import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import BussinessProjects from "@/components/Projects/BusinessProjects";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName=" Relevant Business Projects" />
      <div className="flex flex-col gap-10">
        {" "}
        <BussinessProjects />
      </div>
    </DefaultLayout>
  );
};

export default page;
