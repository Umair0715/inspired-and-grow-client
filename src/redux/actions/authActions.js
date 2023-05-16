import Axios from 'config/api';
import { setLoading, setUser , setUpdateLoading } from 'redux/reducers/authReducer';
import toastError from 'utils/toastError';
import { toast } from 'react-toastify';

export const createUser = (data , navigate ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.post('/user/register' , data );
        dispatch(setLoading(false));
        navigate('/user-management/users');
        toast.success('User created successfully.');
    } catch (err) {
        dispatch(setLoading(false));
        toastError(err);
    }
}

export const login = (data , navigate ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/admin/login' , data );
        dispatch(setUser({...doc}));
        localStorage.setItem('user' , JSON.stringify({...doc}));
        dispatch(setLoading(false));
        navigate('/dashboard');
        toast.success(message);
    } catch (err) {
        dispatch(setLoading(false));
        console.log('login error' , err);
        toastError(err);
    }
}

export const updateProfile = (updatedData) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    const token = getState().auth.user.token;
    try {
        const { data : { data : { doc , message } } } = await Axios.put('/admin/profile' , updatedData  , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        } );
        toast.success(message);
        dispatch(setUser({...doc , token }));
        localStorage.setItem('user' , JSON.stringify({...doc , token }));
        dispatch(setUpdateLoading(false))
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Profile error' , err);
        toastError(err);
    }
}

export const updatePassword = (updatedData) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    const token = getState().auth.user.token;
    try {
        const { data : { data : { doc , message } } } = await Axios.put('/admin/profile' , updatedData  , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        } );
        toast.success(message);
        dispatch(setUser({...doc , token }));
        localStorage.setItem('user' , JSON.stringify({...doc , token }));
        dispatch(setUpdateLoading(false))
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Profile error' , err);
        toastError(err);
    }
}

export const logout = (navigate) => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        await Axios('/admin/logout');
        dispatch(setUser(null));
        localStorage.setItem('user' , null);
        dispatch(setLoading(false));
        navigate('/login');
        toast.success('Logged out successfully.')
    } catch (err) {
        dispatch(setLoading(false));
        console.log('logout error' , err);
        toastError(err);
    }
}