import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DocxDialog from "@/components/DocxDialog";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data" />
      <div className="flex flex-col gap-10">
        <DocxDialog/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
