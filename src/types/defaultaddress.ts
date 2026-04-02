export interface IDefaultAddress {
  ID: string;
  No: string;
  Factory: string;
  DefaultAddress: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
}

export const HEADER_DEFAULT_ADDRESS: {
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
    name: 'Default Address',
    state: 'DefaultAddress',
    sort: true,
  },
  {
    name: 'CreatedBy',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'CreatedAt',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'UpdatedBy',
    state: 'UpdatedBy',
    sort: true,
  },
  {
    name: 'UpdatedAt',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'Action',
    state: 'Action',
    sort: false,
  },
];
