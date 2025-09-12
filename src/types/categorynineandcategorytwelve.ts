export interface ICategoryNineAndCategoryTwelve {
  No: string;
  Date: string;
  Invoice_Number: string;
  Article_Name: string;
  Quantity: number;
  Gross_Weight: number;
  Customer_ID: string;
  Local_Land_Transportation: string;
  Port_Of_Departure: string;
  Port_Of_Arrival: string;
  Land_Transport_Distance: string;
  Sea_Transport_Distance: string;
  Air_Transport_Distance: string;
  Transport_Method: string;
  Land_Transport_Ton_Kilometers: string;
  Sea_Transport_Ton_Kilometers: string;
  Air_Transport_Ton_Kilometers: string;
}

export const HEADER = [
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
  // {
  //   name: "Land Transport Distance",
  //   state: "Land_Transport_Distance",
  //   sort: true,
  // },
  // {
  //   name: "Sea Transport Distance",
  //   state: "Sea_Transport_Distance",
  //   sort: true,
  // },
  // {
  //   name: "Air Transport Distance",
  //   state: "Air_Transport_Distance",
  //   sort: true,
  // },
  {
    name: "Transport Method",
    state: "Transport_Method",
    sort: true,
  },
  // {
  //   name: "Land Transport Ton-Kilometers",
  //   state: "Land_Transport_Ton_Kilometers",
  //   sort: true,
  // },
  // {
  //   name: "Sea Transport Ton-Kilometers",
  //   state: "Sea_Transport_Ton_Kilometers",
  //   sort: true,
  // },
  // {
  //   name: "Air Transport Ton-Kilometers",
  //   state: "Air_Transport_Ton_Kilometers",
  //   sort: true,
  // },
];
