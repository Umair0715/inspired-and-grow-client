import { createSlice } from '@reduxjs/toolkit';


const bannerSlice = createSlice({
    name : 'banner' ,
    initialState : {
        banners : [] ,
        loading : false ,
        createLoading : false ,
        updateLoading : false ,
        deleteLoading : false ,
        currentPage : 1 ,
        pages : 1 , 
        singleBanner : null ,
        editItem : null ,
    } , 
    reducers : {
        addBanner (state , action) {
            state.banners.unshift(action.payload);
        } ,
        setBanners (state , action){
            state.banners = action.payload 
        } ,
        updateBanner (state , action) {
            const index = state.banners.findIndex(banner => banner._id === action.payload._id);
            state.banners[index] = action.payload  
        } ,
        removeBanner (state , action) {
            state.banners = state.banners.filter(b => b._id !== action.payload)
        } , 
        setEditItem (state , action) {
            state.editItem = action.payload;
        } , 
        setSingleBanner (state , action){
            state.singleBanner = action.payload;
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
    }
});

export const {
    addBanner , setBanners , updateBanner , removeBanner , setCurrentPage , setPages , setLoading , setUpdateLoading , setCreateLoading , setDeleteLoading , setEditItem , setSingleBanner 
} = bannerSlice.actions;

export default bannerSlice.reducer;

