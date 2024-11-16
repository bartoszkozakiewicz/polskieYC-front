import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DataTable from "@/components/Tables/DataTable"

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data" />
      <div className="flex flex-col gap-10">
        {/* <TableThree /> */}
        <DataTable/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
