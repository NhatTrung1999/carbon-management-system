export interface IDefaultAddress {
  ID: string;
  No: string;
  Factory: string;
  DefaultAddress: string;
  CreatedAt: string;
  CreatedBy: string;
  CreatedFactory: string;
  UpdatedAt: string;
  UpdatedBy: string;
  UpdatedFactory: string;
}

export const HEADER_DEFAULT_ADDRESS: {
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
    name: 'tabs.default_address',
    state: 'DefaultAddress',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_by',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'cat7.created_at',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'cat7.updated_by',
    state: 'UpdatedBy',
    sort: true,
  },
  {
    name: 'usermmt.updated_at',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.action',
    state: 'Action',
    sort: false,
  },
];
