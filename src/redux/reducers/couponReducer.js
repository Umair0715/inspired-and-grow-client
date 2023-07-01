import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name : 'coupon' ,
    initialState : {
        coupons : [] ,
        couponDetails : null ,
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
            state.coupons = action.payload
        } ,
        setDocDetails (state , action) {
            state.couponDetails = action.payload
        } ,
        addDoc (state , action) {
            state.coupons = state.coupons.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.coupons.findIndex(i => i._id === action.payload._id);
            state.coupons[index] = action.payload;
            state.couponDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.coupons = state.coupons.filter(i => i._id !== action.payload);
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
} = couponSlice.actions;

export default couponSlice.reducer;