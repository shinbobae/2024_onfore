export type AuthLoginRequest = { user_account: string; user_password: string };
export type AuthLoginResponse = { access_token: string; refresh_token: string };
export type AuthRefreshRequest = { refresh_token: string };
export type AuthRefreshResponse = { access_token: string; refresh_token: string };
