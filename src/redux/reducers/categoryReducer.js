import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name : 'category' , 
    initialState : {
        categories : [] ,
        subCategories : [] ,
        categoryDetails : '' ,
        loading : false ,
        deleteLoading : false ,
        updateLoading : false ,
        createLoading : false , 
        pages : 1 ,
        currentPage : 1 ,
    } , 
    reducers : {
        addCategory (state , action) {
            state.categories.unshift(action.payload)
        } ,
        removeCategory (state , action) {
            state.categories = state.categories.filter(item => item._id !== action.payload);
        } ,
        setCategories (state , action) {
            state.categories = action.payload;
        } ,
        setCategoryDetails (state , action) {
            state.categoryDetails = action.payload;
        } ,
        setSubCategories (state , action) {
            state.subCategories = action.payload;
        } ,
        updateCategory (state , action) {
            const index = state.categories.findIndex(item => item._id === action.payload._id);
            state.categories[index] = action.payload;
        } ,
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action) {
            state.updateLoading = action.payload;
        } ,
        setDeleteLoading (state , action) {
            state.deleteLoading = action.payload;
        } ,
        setCreateLoading (state , action) {
            state.createLoading = action.payload;
        } , 
        setCurrentPage (state , action){
            state.currentPage = action.payload;
        } , 
        setPages (state , action){
            state.pages = action.payload;
        }
    }
});

export const {
    addCategory , removeCategory , setCategories , updateCategory , setLoading , setUpdateLoading , setDeleteLoading , setCreateLoading , setCurrentPage , setPages , setSubCategories , setCategoryDetails
} = categorySlice.actions;

export default categorySlice.reducer;