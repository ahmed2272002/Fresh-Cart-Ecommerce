import { configureStore } from '@reduxjs/toolkit'
import { CounterReducer, CounterSlice } from './slices/counterSlices'
import { ProductReducer } from './slices/productSilces'


export const store = configureStore({
    reducer : {
     // import all reducer (slices)
     counter : CounterReducer,
     product : ProductReducer,
    }
})

// console.log(CounterSlice)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
