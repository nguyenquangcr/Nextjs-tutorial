import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { medicineService } from 'api/medicine';
import { openNotificationWithIcon } from '@/components/notificationComponent';

export interface MedicineState {
  arrShoping: Array<any>;
  user: any;
  arrMedicine: Array<any>;
}

const initialState: MedicineState = {
  arrShoping: [],
  user: null,
  arrMedicine: [],
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
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
  },
});

// Action creators are generated for each case reducer function
export const { updateArrShoping, addProductToShopingCart, updateUser } = medicineSlice.actions;

export function getListMedicine(): any {
  return async (dispatch: any) => {
    try {
      await medicineService
        .getListMedicine()
        .then((res) => {
          if (res) {
            // openNotificationWithIcon(200, 'get list success');
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

export default medicineSlice.reducer;
