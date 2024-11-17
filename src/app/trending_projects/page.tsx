import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import TrendingProjects from "@/components/Projects/TrendingProjects.tsx";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Relevant Trending Projects" />
      <div className="flex flex-col gap-10">
        <TrendingProjects />
      </div>
    </DefaultLayout>
  );
};

export default page;
