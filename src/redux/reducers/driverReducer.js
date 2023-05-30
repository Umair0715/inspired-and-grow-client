import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
    name : 'driver' ,
    initialState : {
        drivers : [] ,
        driverDetails : null ,
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
            state.drivers = action.payload
        } ,
        setDocDetails (state , action) {
            state.driverDetails = action.payload
        } ,
        addDoc (state , action) {
            state.drivers = state.drivers.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.drivers.findIndex(i => i._id === action.payload._id);
            state.drivers[index] = action.payload;
            state.driverDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.drivers = state.drivers.filter(i => i._id !== action.payload);
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
} = driverSlice.actions;

export default driverSlice.reducer;