import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';
import { UserInfoResponse } from './type.ts';

const userInfo = async (): Promise<ResultResponse<UserInfoResponse>> => {
  return await ApiCommon.get(`/admin/user/me`);
};
export const UserApi = { userInfo };
