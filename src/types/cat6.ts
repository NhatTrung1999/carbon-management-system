export interface ICat6RouteItem {
  AddressName: string;
  Transport: string;
  AddressDetail: string;
  isAirport: boolean;
  From: string;
  To: string;
}

export interface ICat6Data {
  Application_Day: string;
  Document_Number: string;
  Staff_ID: string;
  Dept: string;
  Round_trip_One_way: string;
  Start_Time: string;
  End_Time: string;
  Business_Trip_Type: string;
  Departure: string;
  Destination: string;
  Transport: string;
  Number_of_nights_stayed: number;
  TotalRow: number;
  [key: string]: string | number | undefined;
}

const fixedCat6Header = [
  {
    name: 'cat6.document_date',
    state: 'Application_Day',
    sort: true,
  },
  {
    name: 'cat6.document_number',
    state: 'Document_Number',
    sort: true,
  },
  {
    name: 'cat6.staff_id',
    state: 'Staff_ID',
    sort: true,
  },
  {
    name: 'cat6.dept',
    state: 'Dept',
    sort: true,
  },
  {
    name: 'cat6.round_trip_one_way',
    state: 'Round_trip_One_way',
    sort: true,
  },
  {
    name: 'cat6.start_time',
    state: 'Start_Time',
    sort: true,
  },
  {
    name: 'cat6.end_time',
    state: 'End_Time',
    sort: true,
  },
  {
    name: 'cat6.business_trip_type',
    state: 'Business_Trip_Type',
    sort: true,
  },
] as const;

export const getCat6Header = () => [
  ...fixedCat6Header,
  {
    name: 'cat6.departure',
    state: 'Departure',
    sort: true,
  },
  {
    name: 'cat6.destination',
    state: 'Destination',
    sort: true,
  },
  {
    name: 'cat6.transport',
    state: 'Transport',
    sort: true,
  },
  {
    name: 'cat6.number_of_nights_stayed',
    state: 'Number_of_nights_stayed',
    sort: true,
  },
];

export const HEADER: {
  name: string;
  state: string;
  sort: boolean;
  children?: { name: string; state: string; sort: boolean }[];
}[] = [
  {
    name: 'cat6.document_date',
    state: 'Application_Day',
    sort: true,
  },
  {
    name: 'cat6.document_number',
    state: 'Document_Number',
    sort: true,
  },
  {
    name: 'cat6.staff_id',
    state: 'Staff_ID',
    sort: true,
  },
  {
    name: 'cat6.dept',
    state: 'Dept',
    sort: true,
  },
  {
    name: 'cat6.round_trip_one_way',
    state: 'Round_trip_One_way',
    sort: true,
  },
  {
    name: 'cat6.start_time',
    state: 'Start_Time',
    sort: true,
  },
  {
    name: 'cat6.end_time',
    state: 'End_Time',
    sort: true,
  },
  {
    name: 'cat6.business_trip_type',
    state: 'Business_Trip_Type',
    sort: true,
  },
  {
    name: 'cat6.route_list',
    state: 'Route_list',
    sort: true,
    children: [
      { name: 'cat6.place_1', state: 'Place1', sort: true },
      { name: 'cat6.place_2', state: 'Place2', sort: true },
      { name: 'cat6.place_3', state: 'Place3', sort: true },
      { name: 'cat6.place_4', state: 'Place4', sort: true },
    ],
  },
  {
    name: 'cat6.transport',
    state: 'Transport',
    sort: true,
    children: [
      { name: 'cat6.transport_1', state: 'Transport_1', sort: true },
      { name: 'cat6.transport_2', state: 'Transport_2', sort: true },
      { name: 'cat6.transport_3', state: 'Transport_3', sort: true },
    ],
  },
  {
    name: 'cat6.number_of_nights_stayed',
    state: 'Number_of_nights_stayed',
    sort: true,
  },
];
