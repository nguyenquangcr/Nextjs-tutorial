import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { medicineService } from 'api/medicine';
import { openNotificationWithIcon } from '@/components/notificationComponent';
import { userService } from 'api/user';

export interface UserState {
  accessToken: string | null;
  inforUser: Object | null;
  loading: boolean;
}

const initialState: UserState = {
  accessToken: null,
  inforUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStateLoading: (state, { payload }: PayloadAction<any>) => {
      state.loading = payload;
    },
    updateAccessToken: (state, { payload }: PayloadAction<any>) => {
      state.accessToken = payload;
    },
    updateInforUser: (state, { payload }: PayloadAction<any>) => {
      state.inforUser = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAccessToken, updateInforUser } = userSlice.actions;

//MEDICINE
export function funcLogin(data: any): any {
  return async (dispatch: any) => {
    dispatch(userSlice.actions.updateStateLoading(true));
    try {
      await userService
        .login(data)
        .then((res) => {
          dispatch(userSlice.actions.updateStateLoading(false));
          if (res.status == 201 && res.data) {
            openNotificationWithIcon(200, 'Đăng nhập thành công!');
            dispatch(userSlice.actions.updateAccessToken(res?.data?.access_token));
            localStorage.setItem('accessToken', res?.data?.access_token);
          }
        })
        .catch((err) => {
          console.log('err', err);
          openNotificationWithIcon(500, 'Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu');
          dispatch(userSlice.actions.updateStateLoading(false));
        });
    } catch (error) {
      console.log('error', error);
      openNotificationWithIcon(500, 'Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu');
      dispatch(userSlice.actions.updateStateLoading(false));
    }
  };
}

export function getUserInfo(): any {
  return async (dispatch: any) => {
    try {
      await userService
        .getUserInfo()
        .then((res) => {
          if (res.status == 200 && res.data) {
            dispatch(userSlice.actions.updateInforUser(res?.data));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export default userSlice.reducer;
