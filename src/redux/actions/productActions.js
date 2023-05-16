import Axios from "config/api";
import { 
    addProduct, removeProduct, setProducts, setCreateLoading, setDeleteLoading , updateProduct , setLoading, setUpdateLoading, setPages, setCurrentPage , setProductDetails, removeProductImage 
} from "redux/reducers/productReducer";
import { toast } from "react-toastify";
import toastError from "utils/toastError";
const endPoint = '/inventory'


export const createProduct = (data , navigate) => async (dispatch , getState) => {
    try {
        dispatch(setCreateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.post(`${endPoint}` , data , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(addProduct(doc));
        dispatch(setCreateLoading(false));
        navigate('/inventory-management/inventories');
        toast.success('Product created successfully.');
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('Create Product error:' , err);
        toastError(err);
    }
}


export const editProduct = (id , data , setImages) => async (dispatch , getState) => {
    try {
        dispatch(setUpdateLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.put(`${endPoint}/${id}` , data  , 
        { headers : { Authorization : `Bearer ${token}`} });
        dispatch(updateProduct(doc));
        dispatch(setUpdateLoading(false));
        toast.success('Updated Successfully.');
        setImages([]);
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Product error' , err);
        toastError(err);
    }
}


export const getProducts = (search) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs , pages , page } } } = await Axios(`${endPoint}?page=${getState().inventory.currentPage}&keyword=${search}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setProducts(docs));
        dispatch(setPages(pages));
        dispatch(setCurrentPage(page));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Products error:' , err);
        toastError(err);
    }
}

export const getProductsForBanner = () => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { docs } } } = await Axios(`${endPoint}/for-banner` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        dispatch(setProducts(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Banner Products error:' , err);
        toastError(err);
    }
}

export const deleteProduct = (id) => async (dispatch , getState) => {
    try {
        dispatch(setDeleteLoading(true));
        const { token } = getState().auth.user;
        await Axios.delete(`${endPoint}/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(removeProduct(id));
        dispatch(setDeleteLoading(false));
        toast.success('Deleted Successfully.');
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete Product error' , err);
        toastError(err);
    }
}

export const getProductDetails = (id) => async (dispatch , getState) => {
    try {
        dispatch(setLoading(true));
        const { token } = getState().auth.user;
        const { data : { data : { doc } } } = await Axios.get(`${endPoint}/${id}` , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(setProductDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('Get Product Details error' , err);
        toastError(err);
    }
}

export const deleteProductImage = (id , image) => async (dispatch , getState) => {
    try {
        dispatch(setDeleteLoading(true));
        const { token } = getState().auth.user;
        await Axios.post(`${endPoint}/remove-image/${id}` , image , 
            { headers : { Authorization : `Bearer ${token}`} }
        );
        dispatch(removeProductImage(image?.image));
        dispatch(setDeleteLoading(false));
        toast.success('Image Removed Successfully.');
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete Product error' , err);
        toastError(err);
    }
}