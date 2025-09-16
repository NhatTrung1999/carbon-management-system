import type { TableHeaderProps } from './table';

export interface IUserManagement {
  ID: string;
  UserID: string;
  Name: string;
  Email: string;
  Role: string;
  Status: string;
  CreatedAt: string;
  CreatedDate: string;
  UpdatedAt: string;
  UpdatedDate: string;
}

export const HEADER: TableHeaderProps[] = [
  {
    name: 'UserID',
    state: 'UserID',
    sort: true,
  },
  {
    name: 'Name',
    state: 'Name',
    sort: true,
  },
  {
    name: 'Email',
    state: 'Email',
    sort: true,
  },
  {
    name: 'Role',
    state: 'Role',
    sort: true,
  },
  {
    name: 'Status',
    state: 'Status',
    sort: true,
  },
  {
    name: 'CreatedAt',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'CreatedDate',
    state: 'CreatedDate',
    sort: true,
  },
  {
    name: 'UpdatedAt',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'UpdatedDate',
    state: 'UpdatedDate',
    sort: true,
  },
];
