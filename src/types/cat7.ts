

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
    name: 'cat7.staff_id',
    state: 'Staff_ID',
    sort: true,
  },
  {
    name: 'cat7.residential_address',
    state: 'Residential_address',
    sort: true,
  },
  {
    name: 'cat7.main_transportation_type',
    state: 'Main_transportation_type',
    sort: true,
  },
  {
    name: 'cat7.km',
    state: 'km',
    sort: true,
  },
  {
    name: 'cat7.number_of_working_days',
    state: 'Number_of_working_days',
    sort: true,
  },
  // {
  //   name: 'cat7.number_of_working_days_rounded',
  //   state: 'Number_of_working_days_rounded',
  //   sort: false,
  // },
  {
    name: 'cat7.pkt_p_km',
    state: 'PKT_p_km',
    sort: true,
  },
];
