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
    name: 'COMID',
    state: 'COMID',
    sort: true,
  },
  {
    name: 'Company Name',
    state: 'Company_Name',
    sort: true,
  },
  {
    name: 'Address',
    state: 'Address',
    sort: true,
  },
  {
    name: 'City',
    state: 'City',
    sort: true,
  },
  {
    name: 'Tel',
    state: 'Tel',
    sort: true,
  },
  {
    name: 'Fax',
    state: 'Fax',
    sort: true,
  },
  {
    name: 'Account No',
    state: 'Account_No',
    sort: true,
  },
  {
    name: 'YN',
    state: 'YN',
    sort: true,
  },
  {
    name: 'Name VN',
    state: 'Name_VN',
    sort: true,
  },
  {
    name: 'Created User',
    state: 'CreatedUser',
    sort: true,
  },
  {
    name: 'Created Factory',
    state: 'CreatedFactory',
    sort: true,
  },
  {
    name: 'Created Date',
    state: 'CreatedDate',
    sort: true,
  },
  {
    name: 'Updated User',
    state: 'UpdatedUser',
    sort: true,
  },
  {
    name: 'Updated Factory',
    state: 'UpdatedFactory',
    sort: true,
  },
  {
    name: 'Updated Date',
    state: 'UpdatedDate',
    sort: true,
  },
];
