import Axios from "config/api";
import { toast } from "react-toastify";
import { addSubCategory, removeSubCategory, setSubCategories, setCreateLoading, setDeleteLoading , updateSubCategory , setLoading, setUpdateLoading, setPages, setCurrentPage  , setSubCategoryDetails } from "redux/reducers/subCategoryReducer";
import toastError from "utils/toastError";

const endPoint = `/sub-category`

export const createSubCategory = (data , navigate) => async (dispatch , getState) => {
    try {
        dispatch(setCreateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.post(endPoint , data , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(addSubCategory(doc));
        dispatch(setCreateLoading(false));
        navigate('/category-management/sub-category')
        toast.success('Created successfully.');
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('Create Sub category error:' , err);
        toastError(err);
    }
}


export const editSubCategory = (id , updateData) => async (dispatch , getState) => {
    try {
        dispatch(setUpdateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.put(`${endPoint}/${id}` , updateData  , 
        { headers : { Authorization : `Bearer ${token}`} });
        dispatch(updateSubCategory(doc));
        dispatch(setUpdateLoading(false));
        toast.success('Updated Successfully.');
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Sub Category error' , err);
        toastError(err);
    }
}


export const getSubCategories = () => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs , pages , page } } } = await Axios(`${endPoint}?page=${getState().subCategory.currentPage}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setSubCategories(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Sub categories error:' , err);
        toastError(err);
    }
}

export const getMainSubCategories = (mainCatId) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs } } } = await Axios(`${endPoint}/all/${mainCatId}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setSubCategories(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Sub categories error:' , err);
        toastError(err);
    }
}

export const getSubCategoryDetails = (catId) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios(`/sub-category/${catId}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setSubCategoryDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get category error:' , err);
        toastError(err);
    }
}


export const deleteSubCategory = (id) => async (dispatch , getState) => {
    try {
        dispatch(setDeleteLoading(true));
        const { token } = getState().auth.user;
        await Axios.delete(`${endPoint}/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(removeSubCategory(id));
        dispatch(setDeleteLoading(false));
        toast.success('Deleted Successfully.');
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete Category error' , err);
        toastError(err);
    }
}


export const getTotalSubCategories = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { docs } } } = await Axios(`${endPoint}/all`);
        dispatch(setSubCategories(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Total Sub categories error:' , err);
        toastError(err);
    }
}