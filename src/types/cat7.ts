export interface ICat7Data {
  Staff_ID: string;
  Residential_address: string;
  Main_transportation_type: string;
  km: number;
  Number_of_working_days: number;
  PKT_p_km: number;
}

export const HEADER: { name: string; state: string; sort: boolean }[] = [
  {
    name: 'Staff ID',
    state: 'Staff_ID',
    sort: true,
  },
  {
    name: 'Residential address',
    state: 'Residential_address',
    sort: true,
  },
  {
    name: 'Main transportation type',
    state: 'Main_transportation_type',
    sort: true,
  },
  {
    name: 'km',
    state: 'km',
    sort: true,
  },
  {
    name: 'Number of working days',
    state: 'Number_of_working_days',
    sort: true,
  },
  // {
  //   name: 'Number of working days(Rounded)',
  //   state: 'Number_of_working_days_rounded',
  //   sort: false,
  // },
  {
    name: 'PKT (p-km)',
    state: 'PKT_p_km',
    sort: true,
  },
];
