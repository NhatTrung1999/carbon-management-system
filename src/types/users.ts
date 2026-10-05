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

export interface ModulePermissionState {
  permissionsConfigured: boolean;
  modulePermissions: string[];
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
    name: 'usermmt.userid',
    state: 'UserID',
    sort: true,
  },
  {
    name: 'usermmt.name',
    state: 'Name',
    sort: true,
  },
  {
    name: 'usermmt.email',
    state: 'Email',
    sort: true,
  },
  {
    name: 'usermmt.role',
    state: 'Role',
    sort: true,
  },
  {
    name: 'usermmt.status',
    state: 'Status',
    sort: true,
  },
  {
    name: 'usermmt.created_at',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'usermmt.created_date',
    state: 'CreatedDate',
    sort: true,
  },
  {
    name: 'usermmt.updated_at',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'usermmt.updated_date',
    state: 'UpdatedDate',
    sort: true,
  },
];
