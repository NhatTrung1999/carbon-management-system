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
