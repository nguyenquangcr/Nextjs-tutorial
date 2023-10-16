import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { medicineService } from 'api/medicine';
import { openNotificationWithIcon } from '@/components/notificationComponent';
import { userService } from 'api/user';

export interface UserState {
  openModalLogin: boolean;
  accessTokenUser: string | null;
  listUser: Array<any>;
  accessToken: string | null;
  inforUser: Object | null;
  loading: boolean;
}

const initialState: UserState = {
  openModalLogin: false,
  accessTokenUser: null,
  listUser: [],
  accessToken: null,
  inforUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateArrUser: (state, { payload }: PayloadAction<any>) => {
      state.listUser = payload;
    },
    updateStateLoading: (state, { payload }: PayloadAction<any>) => {
      state.loading = payload;
    },
    updateAccessToken: (state, { payload }: PayloadAction<any>) => {
      state.accessToken = payload;
    },
    updateInforUser: (state, { payload }: PayloadAction<any>) => {
      state.inforUser = payload;
    },
    updateOpenModalLoging: (state, { payload }: PayloadAction<any>) => {
      state.openModalLogin = payload;
    },
    updateAccessTokenUser: (state, { payload }: PayloadAction<any>) => {
      state.accessTokenUser = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAccessToken, updateInforUser, updateOpenModalLoging, updateAccessTokenUser } =
  userSlice.actions;

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

//Đăng nhập
export function funcLoginUser(data: any): any {
  return async (dispatch: any) => {
    dispatch(userSlice.actions.updateStateLoading(true));
    try {
      await userService
        .loginUser(data)
        .then((res) => {
          dispatch(userSlice.actions.updateStateLoading(false));
          if (res.status == 201 && res.data) {
            openNotificationWithIcon(200, 'Đăng nhập thành công!');
            dispatch(userSlice.actions.updateAccessTokenUser(res?.data?.access_token));
            dispatch(userSlice.actions.updateOpenModalLoging(false));
            localStorage.setItem('accessTokenUser', res?.data?.access_token);
            dispatch(getUserInfoUser());
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
//Đăng ký
export function funcCreateUser(data: any, setTypeForm: any, form: any): any {
  return async (dispatch: any) => {
    dispatch(userSlice.actions.updateStateLoading(true));
    try {
      await userService
        .createNewUser(data)
        .then((res) => {
          dispatch(userSlice.actions.updateStateLoading(false));
          if (res.status == 201 && res.data) {
            openNotificationWithIcon(200, 'Đăng ký tài khoản thành công!');
            setTypeForm('');
            form.resetFields();
            dispatch(userSlice.actions.updateOpenModalLoging(false));
          }
        })
        .catch((err) => {
          console.log('err', err);
          openNotificationWithIcon(500, 'Đăng ký tài khoản thất bại');
          dispatch(userSlice.actions.updateStateLoading(false));
        });
    } catch (error) {
      console.log('error', error);
      openNotificationWithIcon(500, 'Đăng ký tài khoản thất bại');
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

export function getUserInfoUser(): any {
  return async (dispatch: any) => {
    try {
      await userService
        .getUserInfoUser()
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

export function getListUser(): any {
  return async (dispatch: any) => {
    try {
      await userService
        .getListUser()
        .then((res) => {
          if (res) {
            dispatch(userSlice.actions.updateArrUser(res?.data));
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

export function CreateUser(data: any, form: any): any {
  return async (dispatch: any) => {
    dispatch(userSlice.actions.updateStateLoading(true));
    try {
      await userService
        .createUser(data)
        .then((res) => {
          openNotificationWithIcon(200, 'Create user success');
          dispatch(userSlice.actions.updateStateLoading(false));
          dispatch(getListUser());
          form.resetFields();
        })
        .catch((err) => {
          console.log('err', err);
          openNotificationWithIcon(500, 'Create user failed');
          dispatch(userSlice.actions.updateStateLoading(false));
        });
    } catch (error) {
      console.log('error', error);
      openNotificationWithIcon(500, 'Create user failed');
      dispatch(userSlice.actions.updateStateLoading(false));
    }
  };
}

export function deleteUser(id: string): any {
  return async (dispatch: any) => {
    try {
      await userService
        .deleteUser(id)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Delete order success');
            dispatch(getListUser());
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
