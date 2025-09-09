import { Fragment, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Typography from "../../../components/common/Typography";
import { BreadcrumbData } from "../../../types/breadcrumb";

import Card from "../../../components/common/Card";
import Search from "../../../components/Category/CategoryNineAndCategoryTwelve/Search";
import Table from "../../../components/Category/CategoryNineAndCategoryTwelve/Table";

const CategoryNineAndCategoryTwelvePage = () => {
  const HEADER = [
    {
      name: "No.",
      state: "No",
      sort: true,
    },
    {
      name: "Date",
      state: "Date",
      sort: true,
    },
    {
      name: "Invoice Number",
      state: "Invoice_Number",
      sort: true,
    },
    {
      name: "Article Name\n(Style Name)",
      state: "Article_Name",
      sort: true,
    },
    {
      name: "Quantity",
      state: "Quantity",
      sort: true,
    },
    {
      name: "Gross Weight (Unit:Ton)",
      state: "Gross_Weight",
      sort: true,
    },
    {
      name: "Customer ID",
      state: "Customer_ID",
      sort: true,
    },
    {
      name: "Local land transportation \nFactory→Port",
      state: "Local_Land_Transportation",
      sort: true,
    },
    {
      name: "Port of Departure",
      state: "Port_Of_Departure",
      sort: true,
    },
    {
      name: "Port of Arrival",
      state: "Port_Of_Arrival",
      sort: true,
    },
    {
      name: "Land Transport Distance",
      state: "Land_Transport_Distance",
      sort: true,
    },
    {
      name: "Sea Transport Distance",
      state: "Sea_Transport_Distance",
      sort: true,
    },
    {
      name: "Air Transport Distance",
      state: "Air_Transport_Distance",
      sort: true,
    },
    {
      name: "Transport Method",
      state: "Transport_Method",
      sort: true,
    },
    {
      name: "Land Transport Ton-Kilometers",
      state: "Land_Transport_Ton_Kilometers",
      sort: true,
    },
    {
      name: "Sea Transport Ton-Kilometers",
      state: "Sea_Transport_Ton_Kilometers",
      sort: true,
    },
    {
      name: "Air Transport Ton-Kilometers",
      state: "Air_Transport_Ton_Kilometers",
      sort: true,
    },
  ];

  const DATA = [
    {
      No: 1,
      Date: "2025-09-08",
      Invoice_Number: "089",
      Article_Name: "ABC123",
      Quantity: 20,
      Gross_Weight: 30,
      Customer_ID: 12345,
      Local_Land_Transportation: "123",
      Port_Of_Departure: "123",
      Port_Of_Arrival: "123",
      Land_Transport_Distance: "123",
      Sea_Transport_Distance: "123",
    },
  ];

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: "asc",
  });

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(
          "Carbon Management System",
          "Category Nine & Category Twelve"
        )}
      />

      <Typography
        name="Category Nine & Category Twelve"
        className="block text-xs font-semibold text-[#081c1b]"
      />
      <Typography
        name="Downstream And End‑of‑life"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />

      <Card>
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

export default CategoryNineAndCategoryTwelvePage;
