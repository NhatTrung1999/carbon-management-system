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

export const HEADER: { name: string; state: string; sort: boolean }[] = [
  {
    name: 'Document Date',
    state: 'Document_Date',
    sort: true,
  },
  {
    name: 'Document Number',
    state: 'Document_Number',
    sort: true,
  },
  {
    name: 'Staff ID',
    state: 'Staff_ID',
    sort: true,
  },
  {
    name: 'Round trip / One-way',
    state: 'Round_trip_One_way',
    sort: true,
  },
  {
    name: 'Business Trip Type',
    state: 'Business_Trip_Type',
    sort: true,
  },
  {
    name: 'Place of Departure',
    state: 'Place_of_Departure',
    sort: true,
  },
  {
    name: 'Departure Airport',
    state: 'Departure_Airport',
    sort: true,
  },
  {
    name: 'Land Transport Distance (km) (A)',
    state: 'Land_Transport_Distance_km_A',
    sort: true,
  },
  {
    name: 'Land Trasportation Type (A)',
    state: 'Land_Trasportation_Type_A',
    sort: true,
  },
  {
    name: 'Destination Airport',
    state: 'Destination_Airport',
    sort: true,
  },
  {
    name: 'Destination 1',
    state: 'Destination_1',
    sort: true,
  },
  {
    name: 'Destination 2',
    state: 'Destination_2',
    sort: true,
  },
  {
    name: 'Land Transport Distance (km) (B)',
    state: 'Land_Transport_Distance_km_B',
    sort: true,
  },
  {
    name: 'Land Trasportation Type (B)',
    state: 'Land_Trasportation_Type_B',
    sort: true,
  },
  {
    name: 'Air Transport Distance (km)',
    state: 'Air_Transport_Distance_km',
    sort: true,
  },
  {
    name: 'Number of nights stayed',
    state: 'Number_of_nights_stayed',
    sort: true,
  },
];
