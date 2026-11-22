import { getAllProduct } from "@/services/product.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const productAction = createAsyncThunk("product/getAllProducts" ,async ()=>{
const x = null
const response = await getAllProduct(x);

return response.data

})

const initialState ={
    AllProducts : [],
    isLoading : true,
}

export const ProductSlice = createSlice({
    name : 'product',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        
        builder.addCase(productAction.pending , (state , action)=>{
            console.log("pending");
            state.isLoading = true
        })

        builder.addCase(productAction.fulfilled , (state , action)=>{
            // console.log("fulfilled" , action.payload);
            state.AllProducts = action.payload
            state.isLoading = false
        })

        builder.addCase(productAction.rejected , (state , action)=>{
            console.log("rejected");
            state.isLoading = false
        })
    }
})

// fullfilled
// pending
// rejected

// state , initial state
// action return of function data(response)

export const ProductReducer = ProductSlice.reducer
