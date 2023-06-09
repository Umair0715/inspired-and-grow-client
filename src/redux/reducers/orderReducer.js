import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : 'order' ,
    initialState : {
        orders : [] ,
        orderDetails : null ,
        loading : false , 
        createLoading : false , 
        updateLoading : false , 
        deleteLoading : false , 
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0
    } , 
    reducers : {
        setDocs (state , action) {
            state.orders = action.payload
        } ,
        setDocDetails (state , action) {
            state.orderDetails = action.payload
        } ,
        addDoc (state , action) {
            state.orders = state.orders.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.orders.findIndex(i => i._id === action.payload._id);
            state.orders[index] = action.payload;
            state.orderDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.orders = state.orders.filter(i => i._id !== action.payload);
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
        setCurrentPage (state , action) {
            state.currentPage = action.payload;
        } ,
        setPages (state , action) {
            state.pages = action.payload;
        } ,
        setDocsCount (state , action) {
            state.docsCount = action.payload;
        }
    }
});

export const { 
    setDocs , setDocDetails , setLoading , setCreateLoading , setUpdateLoading , setDeleteLoading , setCurrentPage , setPages , updateDoc , removeDoc , setDocsCount , addDoc 
} = orderSlice.actions;

export default orderSlice.reducer;