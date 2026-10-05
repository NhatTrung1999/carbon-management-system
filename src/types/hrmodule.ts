export const HEADER = [
  {
    name: 'dataHRCollecMod.id',
    state: 'ID',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.fullname',
    state: 'FullName',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.department',
    state: 'Department',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.join_date',
    state: 'JoinDate',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.permanent_address',
    state: 'PermanentAddress',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.current_address',
    state: 'CurrentAddress',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.transport_method',
    state: 'TransportationMethod',
    sort: true,
  },
  {
    name: 'cat7.bus_route',
    state: 'BusRoute',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.bus_station',
    state: 'BusStation',
    sort: true,
  },
  {
    name: 'cat7.pickup_point',
    state: 'PickUpPoint',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.number_of_working_days',
    state: 'NumberOfWorkingDays',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.action',
    state: 'Action',
    sort: false,
  },
];

export interface IHRModule {
  ID: string;
  Department: string;
  FullName: string;
  JoinDate: string;
  PermanentAddress: string;
  CurrentAddress: string;
  TransportationMethod: string;
  BusRoute: string;
  BusStation: string;
  PickUpPoint: string;
  Number_of_Working_Days: string;
}
