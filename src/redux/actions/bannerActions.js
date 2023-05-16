import Axios from "config/api";
import { 
    addBanner, removeBanner, setBanners , updateBanner , setCreateLoading, setDeleteLoading , setLoading, setUpdateLoading, setPages, setCurrentPage, setSingleBanner, setEditItem
} from "redux/reducers/bannerReducer";

const endPoint = '/banners'

export const createBanner = (data , toast , navigate) => async (dispatch , getState) => {
    try {
        dispatch(setCreateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.post(`${endPoint}` , data , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(addBanner(doc));
        dispatch(setCreateLoading(false));
        navigate('/banners');
        toast.success('Banner created successfully.');
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('Create Banner error:' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}


export const _updateBanner = (id , data , toast , navigate) => async (dispatch , getState) => {
    try {
        dispatch(setUpdateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.put(`${endPoint}/${id}` , data  , 
        { headers : { Authorization : `Bearer ${token}`} });
        dispatch(updateBanner(doc));
        dispatch(setUpdateLoading(false));
        navigate('/banners');
        toast.success('Updated Successfully.');
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Banner error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}


export const getBanners = (toast) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs , pages , page } } } = await Axios(`${endPoint}?page=${getState().banner.currentPage}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setBanners(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get banners error:' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}


export const deleteBanner = (id , toast) => async (dispatch , getState) => {
    try {
        dispatch(setDeleteLoading(true));
        const { token } = getState().auth.user;
        await Axios.delete(`${endPoint}/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(removeBanner(id));
        dispatch(setDeleteLoading(false));
        toast.success('Deleted Successfully.');
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete banner error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}

export const getSingleBanner = (id , toast) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.get(`${endPoint}/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(setSingleBanner(doc));
        dispatch(setEditItem(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get single banner error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}
