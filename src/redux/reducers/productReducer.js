import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : 'product' ,
    initialState : {
        products : [] ,
        loading : false ,
        productDetails : {} ,
        createLoading : false ,
        updateLoading : false ,
        deleteLoading : false ,
        currentPage : 1 ,
        pages : 1 , 
    } ,
    reducers : {
        addProduct (state , action) {
            state.products.unshift(action.payload)
        } ,
        setProductDetails (state , action) {
            state.productDetails = action.payload;
        } ,
        removeProduct (state , action) {
            state.products = state.products.filter(item => item._id !== action.payload);
        } ,
        setProducts (state , action) {
            state.products = action.payload;
        } ,
        updateProduct (state , action) {
            const index = state.products.findIndex(item => item._id === action.payload._id);
            state.products[index] = action.payload;
            state.productDetails = action.payload;
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
        } ,
        removeProductImage (state , action) {
            state.productDetails = {
                ...state.productDetails,
                images: state.productDetails.images.filter(img => img !== action.payload)
            };
        }
    }
});


export const { 
    addProduct , updateProduct , removeProduct , setDeleteLoading , setLoading , setUpdateLoading , setCreateLoading , setPages , setCurrentPage  , setProducts  , removeProductImage , setProductDetails 
} = productSlice.actions;

export default productSlice.reducer;

