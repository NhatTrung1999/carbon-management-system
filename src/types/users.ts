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
