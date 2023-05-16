import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
    name : 'subCategory' , 
    initialState : {
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
        addSubCategory (state , action) {
            state.subCategories.unshift(action.payload)
        } ,
        removeSubCategory (state , action) {
            state.subCategories = state.subCategories.filter(item => item._id !== action.payload);
        } ,
        setSubCategories (state , action) {
            state.subCategories = action.payload;
        } ,
        setSubCategoryDetails (state , action) {
            state.categoryDetails = action.payload
        } ,
        updateSubCategory (state , action) {
            const index = state.subCategories.findIndex(item => item._id === action.payload._id);
            state.subCategories[index] = action.payload;
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
    addSubCategory , removeSubCategory , setSubCategories , updateSubCategory , setLoading , setUpdateLoading , setDeleteLoading , setCreateLoading , setCurrentPage , setPages , setSubCategoryDetails
} = subCategorySlice.actions;

export default subCategorySlice.reducer;