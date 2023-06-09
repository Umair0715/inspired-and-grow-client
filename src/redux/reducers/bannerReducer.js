import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
    name : 'banner' ,
    initialState : {
        banners : [] ,
        bannerDetails : null ,
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
            state.banners = action.payload
        } ,
        setDocDetails (state , action) {
            state.bannerDetails = action.payload
        } ,
        addDoc (state , action) {
            state.banners = state.banners.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.banners.findIndex(i => i._id === action.payload._id);
            state.banners[index] = action.payload;
            state.bannerDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.banners = state.banners.filter(i => i._id !== action.payload);
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
} = bannerSlice.actions;

export default bannerSlice.reducer;