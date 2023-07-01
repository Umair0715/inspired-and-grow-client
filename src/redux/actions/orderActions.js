import Axios from 'config/api';
import { setLoading, setDocs , setUpdateLoading , setDocDetails , removeDoc , updateDoc , setCurrentPage , setPages , setDocsCount , addDoc, setCreateLoading, setDeleteLoading } from 'redux/reducers/orderReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

const url = '/order'


export const getAllOrders = (status) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const currentPage = getState().order.currentPage;
        const { data : { data : { docs , page , pages , docCount } } } = await Axios(`${url}?status=${status}&page=${currentPage}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setDocs(docs));
        dispatch(setCurrentPage(page));
        dispatch(setPages(pages));
        dispatch(setDocsCount(docCount));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}


export const getOrderDetails = (itemId) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`${url}/${itemId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setDocDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const updateOrder = (itemId , updateData ) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}` , updateData , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        });
        toast.success(message)
        dispatch(updateDoc(doc));
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const deleteOrder = (itemId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`${url}/${itemId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        toast.success(message)
        dispatch(removeDoc(itemId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}
