import { Fragment, useState } from "react";
import { BreadcrumbData } from "../../../types/breadcrumb";

import Card from "../../../components/common/Card";
import Table from "../../../components/SystemSettings/FileManagement/Table";
import Typography from "../../../components/common/Typography";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Search from "../../../components/SystemSettings/FileManagement/Search";

const FileManagement = () => {
  const HEADER = [
    {
      name: "Module",
      state: "Module",
      sort: true,
    },
    {
      name: "File Name",
      state: "File_Name",
      sort: true,
    },
    {
      name: "Status",
      state: "Status",
      sort: true,
    },
    {
      name: "Created by User",
      state: "CreatedAt",
      sort: true,
    },
    {
      name: "Date Recorded by User",
      state: "CreatedDate",
      sort: true,
    },
  ];

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: "asc",
  });

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData("Carbon Management System", "File Management")}
      />

      <Typography
        name="File Management"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card className="relative">
        <Search />
        <Table
          header={HEADER}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
      </Card>
    </Fragment>
  );
};

export default FileManagement;
