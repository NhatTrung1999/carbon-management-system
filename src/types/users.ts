import type { TableHeaderProps } from './table';

export interface UserPayload {
  id: string;
  userid: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
}

export interface UpdateUserPayload {
  id: string;
  userid: string;
  name: string;
  email: string;
  role: string;
  status: string;
  updatedAt?: string;
}

export interface SearchPayload {
  userid?: string;
  name?: string;
  sortField?: string;
  sortOrder?: string;
}

export interface Item {
  ID: string;
  UserID: string;
  Name: string;
  Email: string;
  Role: string;
  Status: string;
  UpdatedAt: string;
}

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
