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
