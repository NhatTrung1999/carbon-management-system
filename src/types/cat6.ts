export interface ICat6Data {
  // Document_Date: string;
  // Document_Number: string;
  // Staff_ID: string;
  // Round_trip_One_way: string;
  // Business_Trip_Type: string;
  // Place_of_Departure: string;
  // Departure_Airport: string;
  // Land_Transport_Distance_km_A: string;
  // Land_Trasportation_Type_A: string;
  // Destination_Airport: string;
  // Destination_1: string;
  // Destination_2: string;
  // Land_Transport_Distance_km_B: string;
  // Land_Trasportation_Type_B: string;
  // Air_Transport_Distance_km: string;
  // Number_of_nights_stayed: string;

  Document_Date: string;
  Document_Number: string;
  Staff_ID: string;
  Round_trip_One_way: string;
  Start_Time: string;
  End_Time: string;
  Business_Trip_Type: string;
  Place_of_Departure: string;
  Land_Trasportation_Type_A: string;
  Land_Transport_Distance_km_A: string;
  Departure_Airport: string;
  Destination_Airport: string;
  Air_Transport_Distance_km: string;
  Third_country_transfer_Destination: string;
  Land_Transportation_Type_B: string;
  Land_Transport_Distance_km_B: string;
  Destination_2: string;
  Destination_3: string;
  Destination_4: string;
  Destination_5: string;
  Destination_6: string;
  Land_Transportation_Type: string;
  Land_Transport_Distance_km: string;
  Number_of_nights_stayed: number;
  TotalRow: number;
}

export const HEADER: {
  name: string;
  state: string;
  sort: boolean;
  children?: { name: string; state: string; sort: boolean }[];
}[] = [
  {
    name: 'cat6.document_date',
    state: 'Document_Date',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.document_number',
    state: 'Document_Number',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.staff_id',
    state: 'Staff_ID',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.round_trip_one_way',
    state: 'Round_trip_One_way',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.start_time',
    state: 'Start_Time',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.end_time',
    state: 'End_Time',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.business_trip_type',
    state: 'Business_Trip_Type',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.place_of_departure',
    state: 'Place_of_Departure',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.departure_airport',
    state: 'Departure_Airport',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.land_transport_distance_km_a',
    state: 'Land_Transport_Distance_km_A',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.land_trasportation_type_a',
    state: 'Land_Trasportation_Type_A',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.destination_airport',
    state: 'Destination_Airport',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.third_country_transfer_destination',
    state: 'Third_country_transfer_Destination',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.land_transport_distance_km_b',
    state: 'Land_Transport_Distance_km_B',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.land_transportation_type_b',
    state: 'Land_Transportation_Type_B',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.third_country_transfer',
    state: 'Third_country_transfer',
    sort: true,
    children: [
      { name: 'cat6.destination_2', 
        state: 'Destination_2', 
        sort: true 
      },
      { name: 'cat6.destination_3', 
        state: 'Destination_3', 
        sort: true 
      },
      { name: 'cat6.destination_4', 
        state: 'Destination_4', 
        sort: true 
      },
      { name: 'cat6.destination_5', 
        state: 'Destination_5', 
        sort: true 
      },
      { name: 'cat6.destination_6', 
        state: 'Destination_6', 
        sort: true 
      },
    ],
  },
  {
    name: 'cat6.land_transport_distance_km',
    state: 'Land_Transport_Distance_km',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.land_transportation_type',
    state: 'Land_Transportation_Type',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.air_transport_distance_km',
    state: 'Air_Transport_Distance_km',
    sort: true,
    children: [],
  },
  {
    name: 'cat6.number_of_nights_stayed',
    state: 'Number_of_nights_stayed',
    sort: true,
    children: [],
  },
];
