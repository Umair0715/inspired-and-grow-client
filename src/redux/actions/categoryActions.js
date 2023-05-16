import Axios from "config/api";
import { addCategory, removeCategory, setCategories, setCreateLoading, setDeleteLoading , updateCategory , setLoading, setUpdateLoading, setPages, setCurrentPage, setSubCategories, setCategoryDetails } from "redux/reducers/categoryReducer";
import { toast } from "react-toastify";
import toastError from "utils/toastError";


export const createCategory = (data , navigate ) => async (dispatch , getState) => {
    try {
        dispatch(setCreateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc , message } } } = await Axios.post(`/category` , data , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(addCategory(doc));
        dispatch(setCreateLoading(false));
        navigate('/category-management/main-category')
        toast.success(message);
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('Create category error:' , err);
        toastError(err);
    }
}


export const editCategory = (id , data ) => async (dispatch , getState) => {
    try {
        dispatch(setUpdateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc , message } } } = await Axios.put(`/category/${id}` , data  , 
        { headers : { Authorization : `Bearer ${token}`} });
        dispatch(updateCategory(doc));
        dispatch(setUpdateLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Category error' , err);
        toastError(err);
    }
}


export const getCategories = () => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs , pages , page } } } = await Axios(`/category?page=${getState().category.currentPage}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setCategories(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get categories error:' , err);
        toastError(err);
    }
}

export const getCategoryDetails = (catId) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios(`/category/${catId}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setCategoryDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get category error:' , err);
        toastError(err);
    }
}


export const deleteCategory = (id) => async (dispatch , getState) => {
    try {
        dispatch(setDeleteLoading(true));
        const { token } = getState().auth.user;
        await Axios.delete(`/category/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(removeCategory(id));
        dispatch(setDeleteLoading(false));
        toast.success('Category removed Successfully.');
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete Category error' , err);
        toastError(err);
    }
}


export const getTotalCategories = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { docs } } } = await Axios(`/category/all`);
        dispatch(setCategories(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Total categories error:' , err);
        toastError(err)
    }
}

export const getSubCategories = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { docs } } } = await Axios(`/category/sub/${id}`);
        dispatch(setSubCategories(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Main Sub categories error:' , err);
        toastError(err)
    }
}