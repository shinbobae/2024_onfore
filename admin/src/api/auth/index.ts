import { AuthLoginRequest, AuthLoginResponse, AuthRefreshRequest, AuthRefreshResponse } from './type.ts';
import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';

const authLogin = async (request: AuthLoginRequest): Promise<ResultResponse<AuthLoginResponse>> => {
  return await ApiCommon.post(`/admin/auth/login`, request);
};

const authRefresh = async (request: AuthRefreshRequest): Promise<ResultResponse<AuthRefreshResponse>> => {
  return await ApiCommon.post(`/admin/auth/refresh`, request);
};
export const AuthApi = { authLogin, authRefresh };
