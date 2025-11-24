export interface IFileManagement {
  ID: string;
  Module: string;
  File_Name: string;
  Status: boolean;
  CreatedAt: string;
  CreatedFactory: string;
  CreatedDate: string;
}

export const HEADER = [
  {
    name: 'filemmt.module',
    state: 'Module',
    sort: true,
  },
  {
    name: 'filemmt.file_name',
    state: 'File_Name',
    sort: true,
  },
  {
    name: 'filemmt.status',
    state: 'Status',
    sort: true,
  },
  {
    name: 'filemmt.created_by_user',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'filemmt.created_date',
    state: 'CreatedDate',
    sort: true,
  },
];

export const MODULE_DATA = [
  {
    name: "Cat 1 & Cat 4",
    value: "Cat_1_4",
  },
  {
    name: "Cat 5",
    value: "Cat_5",
  },
  {
    name: "Cat 6",
    value: "Cat_6",
  },
  {
    name: "Cat 7",
    value: "Cat_7",
  },
  {
    name: "Cat 9 & Cat 11",
    value: "Cat_9_11",
  },
];
