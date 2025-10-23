export interface AuthState {
  isAuthenticated: boolean;
  data: Data;
}

interface Data {
  email: string | null;
  id: string | null;
  token: string | null;
  tokenExpirationDate: string | null;
}
