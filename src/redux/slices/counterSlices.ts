import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter : 1,
}

export const CounterSlice = createSlice({
    name : 'counter',
    initialState ,

    reducers:{
        // action creators
        increment : (state)=>{
            state.counter ++ ;
        },
        decrement : (state)=>{
            state.counter -- ;
        },
        // increment by amount 
        incrementAmount: (state , action)=>{
            // console.log(action.payload)
            state.counter += action.payload
        }
    },
})

// reducer , actions , action reducer
export const CounterReducer = CounterSlice.reducer

export const { decrement , increment , incrementAmount} = CounterSlice.actions
