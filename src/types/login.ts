export interface LoginPayload {
  userid: string;
  password: string;
  factory?: string | undefined;
}

/** Signed-in user as returned by auth/login (account row + module permissions). */
export interface AuthUser {
  UserID: string;
  Name: string;
  Email?: string;
  Role?: string;
  Department?: string;
  Factory?: string;
  /** True when per-module permissions were set for this user. */
  permissionsConfigured?: boolean;
  modulePermissions?: string[];
}

/** Tokens and user kept for the browser session. */
export interface Session {
  token: string;
  refreshToken: string;
  user: AuthUser;
}
