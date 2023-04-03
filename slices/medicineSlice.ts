import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MedicineState {
  arrShoping: Array<any>
}

const initialState: MedicineState = {
    arrShoping: [],
}

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    addProductToShopingCart: (state, {payload}: PayloadAction<any>) => {
        state.arrShoping = [...state.arrShoping,payload]
    },
    updateArrShoping: (state, {payload}: PayloadAction<any>) => {
        state.arrShoping = payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateArrShoping, addProductToShopingCart } = medicineSlice.actions;

export default medicineSlice.reducer;