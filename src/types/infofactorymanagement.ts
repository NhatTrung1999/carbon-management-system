export interface InfoFactoryData {
  ID: string;
  COMID: string;
  CompanyName: string;
  Address: string;
  City: string;
  Tel: string;
  Fax: string;
  AccountNo: string;
  YN: string;
  NameVN: string;
  TaxNo: string;
  Active: boolean;
  CreatedUser: string;
  CreatedFactory: string;
  CreatedDate: string;
  UpdatedUser: string;
  UpdatedFactory: string;
  UpdatedDate: string;
}

export const HEADER = [
  {
    name: 'facinfo.comid',
    state: 'COMID',
    sort: true,
  },
  {
    name: 'facinfo.com_name',
    state: 'Company_Name',
    sort: true,
  },
  {
    name: 'facinfo.address',
    state: 'Address',
    sort: true,
  },
  {
    name: 'facinfo.city',
    state: 'City',
    sort: true,
  },
  {
    name: 'facinfo.tel',
    state: 'Tel',
    sort: true,
  },
  {
    name: 'facinfo.fax',
    state: 'Fax',
    sort: true,
  },
  {
    name: 'facinfo.account_no',
    state: 'Account_No',
    sort: true,
  },
  {
    name: 'YN',
    state: 'YN',
    sort: true,
  },
  {
    name: 'facinfo.name_vn',
    state: 'Name_VN',
    sort: true,
  },
  {
    name: 'facinfo.created_user',
    state: 'CreatedUser',
    sort: true,
  },
  {
    name: 'facinfo.created_factory',
    state: 'CreatedFactory',
    sort: true,
  },
  {
    name: 'facinfo.created_date',
    state: 'CreatedDate',
    sort: true,
  },
  {
    name: 'facinfo.updated_user',
    state: 'UpdatedUser',
    sort: true,
  },
  {
    name: 'facinfo.updated_factory',
    state: 'UpdatedFactory',
    sort: true,
  },
  {
    name: 'facinfo.updated_date',
    state: 'UpdatedDate',
    sort: true,
  },
];
