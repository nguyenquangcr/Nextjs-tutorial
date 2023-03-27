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
    updateArrShoping: (state, {payload}: PayloadAction<any>) => {
        state.arrShoping = [...state.arrShoping,payload]
    },
    updateCountMedicine: (state,action: PayloadAction<any>) => {
        const {key, type} = action?.payload;
        let cloneArrShoping = [...state.arrShoping];
        let endArr:any=[];
        cloneArrShoping.map(item=>{
            if(item?.key == key) {
                if(key == 'minus' && item?.count > 0) endArr.push({
                    ...item,count:item.count--
                }) 
                else if(key == 'plus')endArr.push({
                    ...item,count:item.count++
                }) 
            } else endArr.push(item);
        })
        state.arrShoping=[...endArr]
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateArrShoping, updateCountMedicine } = medicineSlice.actions;

export default medicineSlice.reducer;
