import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { medicineService } from 'api/medicine';
import { openNotificationWithIcon } from '@/components/notificationComponent';
import { Moment } from 'moment';

export interface MedicineState {
  totalMedicine: number;
  listMedicineUser: Array<any>;
  arrShoping: Array<any>;
  user: any;
  arrMedicine: Array<any>;
  arrOrder: Array<any>;
}

const initialState: MedicineState = {
  totalMedicine: 0,
  listMedicineUser: [],
  arrShoping: [],
  user: null,
  arrMedicine: [],
  arrOrder: [],
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    updateTotalMedicine: (state, { payload }: PayloadAction<any>) => {
      state.totalMedicine = payload;
    },
    addProductToShopingCart: (state, { payload }: PayloadAction<any>) => {
      state.arrShoping = [...state.arrShoping, payload];
    },
    updateArrShoping: (state, { payload }: PayloadAction<any>) => {
      state.arrShoping = payload;
    },
    updateUser: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    updateArrMedicine: (state, { payload }: PayloadAction<any>) => {
      state.arrMedicine = payload;
    },
    updateListMedicineUser: (state, { payload }: PayloadAction<any>) => {
      state.listMedicineUser = payload;
    },
    updateArrOrder: (state, { payload }: PayloadAction<any>) => {
      state.arrOrder = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateArrShoping, addProductToShopingCart, updateUser } = medicineSlice.actions;

//MEDICINE
export function getListMedicine(): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .getListMedicine()
        .then((res) => {
          if (res) {
            dispatch(medicineSlice.actions.updateArrMedicine(res?.data));
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

export function UpdateTotalMedicine(): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .getListMedicine()
        .then((res) => {
          if (res) {
            dispatch(medicineSlice.actions.updateTotalMedicine(res?.data?.length));
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

export function getListMedicineUser(take: number): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .getListMedicineUser(take)
        .then((res) => {
          if (res) {
            dispatch(medicineSlice.actions.updateListMedicineUser(res?.data));
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

export function deleteMedicine(id: string): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .deleteMedicine(id)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Delete medicine success');
            dispatch(getListMedicine());
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

//ORDER
export function CreateOrder(data: any, setLoadding: any, setSuccess: any): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        ._createOrder(data)
        .then((res) => {
          openNotificationWithIcon(200, 'Create order success');
          dispatch(medicineSlice.actions.updateArrShoping([]));
          setLoadding(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.log('err', err);
          setLoadding(false);
        });
    } catch (error) {
      console.log('error', error);
      setLoadding(false);
    }
  };
}

export function getListOrder(dataFilterDay?: { startDay: string; endDay: string | Moment }): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        ._getListOrder(dataFilterDay)
        .then((res) => {
          if (res) {
            dispatch(medicineSlice.actions.updateArrOrder(res?.data));
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

export function deleteOrder(id: string): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        ._deleteOrder(id)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Delete order success');
            dispatch(getListOrder());
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

export function updateStatusOrder(id: string, data: any): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .__updateStatusOrder(id, data)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Cập nhật trạng thái đơn hàng thành công');
            dispatch(getListOrder());
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

export default medicineSlice.reducer;
