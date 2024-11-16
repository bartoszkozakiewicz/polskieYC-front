import React from 'react'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Formify from '@/components/Formify';


export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};


const page = () => {
  return (
    <DefaultLayout>
      <Formify/>
  </DefaultLayout>
  )
}

export default page