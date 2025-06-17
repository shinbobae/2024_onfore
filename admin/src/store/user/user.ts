import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthApi } from '../../api/auth';
import { AuthLoginRequest, AuthRefreshRequest } from '../../api/auth/type.ts';
import { UserInfoResponse } from '../../api/user/type.ts';
import { UserApi } from '../../api/user';

type UserType = UserStateType & UserActionType;
type UserStateType = {
  userInfo: UserInfoResponse | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loginAt: Date | null;
  loginError: boolean;
};
type UserActionType = {
  login: (data: AuthLoginRequest) => Promise<void>;
  tokenRefresh: (data: AuthRefreshRequest) => Promise<void>;
  setLoginError: (state: boolean) => void;
  logout: () => void;
  getUserInfo: () => void;
};

const userState: UserStateType = {
  userInfo: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  loginAt: null,
  loginError: false,
};

export const useAdminUserStore = create(
  persist<UserType>(
    (set) => ({
      ...userState,

      // login: async (data: LoginRequest) => {
      login: async (data) => {
        set({ ...userState });
        try {
          const response = await AuthApi.authLogin(data);
          const responseData = response.data;
          set({
            isLoggedIn: true,
            accessToken: responseData.access_token,
            refreshToken: responseData.refresh_token,
            loginAt: new Date(),
            loginError: false,
          });
        } catch (error) {
          console.error(error);
          set({
            isLoggedIn: false,
            userInfo: null,
          });
        }
      },
      getUserInfo: async () => {
        await UserApi.userInfo()
          .then((response) => {
            set({ userInfo: response.data });
          })
          .catch(() => {
            set({ userInfo: null });
          });
      },
      tokenRefresh: async (data) => {
        await AuthApi.authRefresh(data)
          .then((response) => {
            const responseData = response.data;
            set({
              accessToken: responseData.access_token,
              refreshToken: responseData.refresh_token,
              loginAt: new Date(),
            });
          })
          .catch((error) => {
            console.error(error);
            set({
              ...userState,
              accessToken: null,
              refreshToken: null,
              loginAt: null,
              isLoggedIn: false,
              userInfo: null,
            });
          });
      },
      setLoginError: (state) => {
        set({ loginError: state });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          userInfo: null,
          loginAt: null,
          accessToken: null,
          refreshToken: null,
          loginError: false,
        });
      },
    }),
    {
      name: 'onliAdminUserStorage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional)이기 때문에 해당 줄을 적지 않으면 'localStorage'가 기본 저장소로 사용된다.
    },
  ),
);

export default useAdminUserStore;
