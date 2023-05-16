import Axios from "config/api";
import { 
    setOrderDetails , setOrders , setLoading, setPages, setCurrentPage, setUpdateLoading , updateOrder, setDocsCount
} from "redux/reducers/orderReducer";

const endPoint = '/orders'

export const getOrders = (toast) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { currentPage , orderStatus } = getState().order;
        const { data : { data : { docs , pages , page , docCount } } } = await Axios(`${endPoint}?page=${currentPage}&orderStatus=${orderStatus}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setOrders(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setDocsCount(docCount));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Orders error:' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}


export const getOrderDetails = (id , toast) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { doc } } } = await Axios(`${endPoint}/${id}`);
        dispatch(setOrderDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Order Details error:' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}

export const getSingleUserOrders = (id , toast) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { currentPage } = getState().order;
        const { data : { data : { docs , pages , page  } } } = await Axios(`${endPoint}/user/${id}?page=${currentPage}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        });
        dispatch(setOrders(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get User Orders error:' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}

export const _updateOrder = (id , data , toast) => async (dispatch , getState) => {
    try {
        dispatch(setUpdateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.put(`${endPoint}/${id}` , data  , 
        { headers : { Authorization : `Bearer ${token}`} });
        dispatch(setOrderDetails(doc));
        dispatch(setUpdateLoading(false));
        toast.success('Updated Successfully.');
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Order error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}