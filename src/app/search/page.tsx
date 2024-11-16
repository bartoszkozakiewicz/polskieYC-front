import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SearchForm from "@/components/SearchForm";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Search" />
      <div className="flex flex-col gap-10">
        <SearchForm />
      </div>
    </DefaultLayout>
  );
};

export default page;
