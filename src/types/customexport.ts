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
    name: 'cat7.no',
    state: 'No',
    sort: true,
  },
  {
    name: 'cat7.factory',
    state: 'Factory',
    sort: true,
  },
  {
    name: 'cat7.department',
    state: 'Department',
    sort: true,
  },
  {
    name: 'cat7.id',
    state: 'ID',
    sort: true,
  },
  {
    name: 'cat7.fullname',
    state: 'Full_Name',
    sort: true,
  },
  {
    name: 'cat7.current_address',
    state: 'Current_Address',
    sort: true,
  },
  {
    name: 'cat7.transport_mode',
    state: 'Transportation_Mode',
    sort: true,
  },
  {
    name: 'cat7.bus_route',
    state: 'Bus_Route',
    sort: true,
  },
  {
    name: 'cat7.pickup_point',
    state: 'Pickup_Point',
    sort: true,
  },
  {
    name: 'cat7.number_of_working_days',
    state: 'Number_of_Working_Days',
    sort: true,
  },
];
