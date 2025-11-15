export interface ICat6Data {
  Document_Date: string;
  Document_Number: string;
  Staff_ID: string;
  Round_trip_One_way: string;
  Business_Trip_Type: string;
  Place_of_Departure: string;
  Departure_Airport: string;
  Land_Transport_Distance_km_A: string;
  Land_Trasportation_Type_A: string;
  Destination_Airport: string;
  Destination_1: string;
  Destination_2: string;
  Land_Transport_Distance_km_B: string;
  Land_Trasportation_Type_B: string;
  Air_Transport_Distance_km: string;
  Number_of_nights_stayed: string;
}

export const HEADER: {
  name: string;
  state: string;
  sort: boolean;
  children?: { name: string; state: string; sort: boolean }[];
}[] = [
  {
    name: 'Document Date',
    state: 'Document_Date',
    sort: true,
    children: [],
  },
  {
    name: 'Document Number',
    state: 'Document_Number',
    sort: true,
    children: [],
  },
  {
    name: 'Staff ID',
    state: 'Staff_ID',
    sort: true,
    children: [],
  },
  {
    name: 'Round trip / One-way',
    state: 'Round_trip_One_way',
    sort: true,
    children: [],
  },
  {
    name: 'Start Time',
    state: 'Start_Time',
    sort: true,
    children: [],
  },
  {
    name: 'End Time',
    state: 'End_Time',
    sort: true,
    children: [],
  },
  {
    name: 'Business Trip Type',
    state: 'Business_Trip_Type',
    sort: true,
    children: [],
  },
  {
    name: 'Place of Departure',
    state: 'Place_of_Departure',
    sort: true,
    children: [],
  },
  {
    name: 'Departure Airport',
    state: 'Departure_Airport',
    sort: true,
    children: [],
  },
  {
    name: 'Land Transport Distance (km) (A)',
    state: 'Land_Transport_Distance_km_A',
    sort: true,
    children: [],
  },
  {
    name: 'Land Trasportation Type (A)',
    state: 'Land_Trasportation_Type_A',
    sort: true,
    children: [],
  },
  {
    name: 'Destination Airport',
    state: 'Destination_Airport',
    sort: true,
    children: [],
  },
  {
    name: 'Third-country transfer-Destination',
    state: 'Third_country_transfer_Destination',
    sort: true,
    children: [],
  },
  {
    name: 'Land Transport Distance (km) (B)',
    state: 'Land_Transport_Distance_km_B',
    sort: true,
    children: [],
  },
  {
    name: 'Land Transportation Type (B)',
    state: 'Land_Transportation_Type_B',
    sort: true,
    children: [],
  },
  {
    name: 'Third-country transfer',
    state: 'Third_country_transfer',
    sort: true,
    children: [
      { name: 'Destination 2', state: 'Destination_2', sort: true },
      { name: 'Destination 3', state: 'Destination_3', sort: true },
      { name: 'Destination 4', state: 'Destination_4', sort: true },
      { name: 'Destination 5', state: 'Destination_5', sort: true },
      { name: 'Destination 6', state: 'Destination_6', sort: true },
    ],
  },
  {
    name: 'Land Transport Distance (km)',
    state: 'Land_Transport_Distance_km',
    sort: true,
    children: [],
  },
  {
    name: 'Land Transportation Type',
    state: 'Land_Transportation_Type',
    sort: true,
    children: [],
  },
  {
    name: 'Air Transport Distance (km)',
    state: 'Air_Transport_Distance_km',
    sort: true,
    children: [],
  },
  {
    name: 'Number of nights stayed',
    state: 'Number_of_nights_stayed',
    sort: true,
    children: [],
  },
];
