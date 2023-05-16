import { createSlice } from '@reduxjs/toolkit';


const orderSlice = createSlice({
    name : 'order' ,
    initialState : {
        orders : [] ,
        orderDetails : {} ,
        loading : false ,
        updateLoading : false ,
        orderLoading : false ,
        deleteLoading : false ,
        orderStatus : 'all' ,
        currentPage : 1 ,
        docsCount : 0 ,
        pages : 1 
    } ,
    reducers : {
        setOrders (state , action) {
            state.orders = action.payload;
        } ,
        setOrderDetails (state , action) {
            state.orderDetails = action.payload;
        } ,
        setDocsCount (state , action) {
            state.docsCount = action.payload;
        } ,
        setOrderStatus (state , action){
            state.orderStatus = action.payload;
        } ,
        updateOrder (state , action) {
            const index = state.orders.findIndex(o => o._id === action.payload._id);
            state.orders[index] = action.payload;
        } ,
        setLoading (state , action) {
            state.loading = action.payload;
        } , 
        setUpdateLoading (state , action) {
            state.updateLoading = action.payload;
        } , 
        setCurrentPage (state , action){
            state.currentPage = action.payload;
        } , 
        setPages (state , action){
            state.pages = action.payload;
        } ,
        
    }
});

export const {
     setOrders , setOrderDetails , setLoading , setUpdateLoading , setCurrentPage , setPages , updateOrder , setDocsCount , setOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;