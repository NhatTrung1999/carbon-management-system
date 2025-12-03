export interface ICustomExportData {
  No: number;
  Factory: string;
  Department: string;
  ID: string;
  Full_Name: string;
  Current_Address: string;
  Transportation_Mode: string;
  Bus_Route: string;
  Pickup_Point: string;
  Number_of_Working_Days: number;
}

export const HEADER_CUSTOM_EXPORT: {
  name: string;
  state: string;
  sort: boolean;
}[] = [
  {
    name: 'No.',
    state: 'No',
    sort: true,
  },
  {
    name: 'Factory',
    state: 'Factory',
    sort: true,
  },
  {
    name: 'Department',
    state: 'Department',
    sort: true,
  },
  {
    name: 'ID',
    state: 'ID',
    sort: true,
  },
  {
    name: 'Full Name',
    state: 'Full_Name',
    sort: true,
  },
  {
    name: 'Current Address',
    state: 'Current_Address',
    sort: true,
  },
  {
    name: 'Transportation Mode',
    state: 'Transportation_Mode',
    sort: true,
  },
  {
    name: 'Bus Route',
    state: 'Bus_Route',
    sort: true,
  },
  {
    name: 'Pickup Point',
    state: 'Pickup_Point',
    sort: true,
  },
  {
    name: 'Number of Working Days',
    state: 'Number_of_Working_Days',
    sort: true,
  },
  // {
  //   name: 'Number of Working Days (Rounded)',
  //   state: 'Number_of_Working_Days_Rounded',
  //   sort: true,
  // },
];
