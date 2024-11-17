import React from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Formify from "@/components/Formify";

export const metadata: Metadata = {
  title: "NerdNed - connect for innovations",
  description:
    "This is NerdNet - marketplace for researchers, bussinesses and investors",
};

const page = () => {
  return (
    <DefaultLayout>
      <Formify />
    </DefaultLayout>
  );
};

export default page;
