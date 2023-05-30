import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React, { useEffect } from 'react';
import { useState , useRef } from 'react';
import FileInput from 'components/global/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import { editDriver, getDriverDetails } from 'redux/actions/driverActions';
import { useParams } from 'react-router-dom';
import Loader from 'components/global/Loader';
import { ClipLoader } from 'react-spinners';
import { baseURL } from 'config/api';
import isBase64 from 'utils/isBase64';

const EditDriver = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [image , setImage] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [location , setLocation] = useState('');
    const [route , setRoute] = useState('');

    const { driverDetails , updateLoading , loading } = useSelector(state => state.driver);

    useEffect(() => {
        dispatch(getDriverDetails(id))
    }, [dispatch , id]);

    useEffect(() => {
        if(driverDetails) {
            setFirstName(driverDetails?.firstName)
            setLastName(driverDetails?.lastName)
            setEmail(driverDetails?.email)
            setPhone(driverDetails?.phone)
            setImage(baseURL + "/drivers/" + driverDetails?.image);
            setLocation(driverDetails?.location);
            setRoute(driverDetails?.route);
        }
    }, [driverDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { firstName , lastName , email , phone , location , route };
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(editDriver(id , data))
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Edit Driver' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
                {
                    loading 
                    ? 
                        <Loader />
                    : 
                    <form 
                    className='shadow-bg p-4 mt-4 flex flex-col gap-4'
                    onSubmit={handleSubmit}
                    >
                        <div className='flex sm:flex-row flex-col gap-6'>
                            <Input 
                            label='First Name'
                            placeholder='Ex: John'
                            value={firstName}
                            setValue={setFirstName}
                            />
                            <Input 
                            label='Last Name'
                            placeholder='Ex: Doe'
                            value={lastName}
                            setValue={setLastName}
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col gap-6'>
                            <Input 
                            label='Email'
                            placeholder='Ex: example@gmail.com'
                            value={email}
                            setValue={setEmail}
                            />
                            <Input 
                            label='Phone Number'
                            placeholder='Ex: +91889328992'
                            value={phone}
                            setValue={setPhone}
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col gap-6'>
                            <Input 
                            label='Location'
                            placeholder='Ex: Mumbai , India'
                            value={location}
                            setValue={setLocation}
                            />
                            <Input 
                            label='Route'
                            placeholder='Enter driver Route'
                            value={route}
                            setValue={setRoute}
                            />
                        </div>
                        <div>
                            <FileInput 
                            label='Image'
                            value={image}
                            setValue={setImage}
                            />
                        </div>
                        <div className='mt-4'>
                            <button 
                            type="submit" 
                            className='btn-primary py-3 px-12'
                            disabled={updateLoading}
                            >
                                {
                                    updateLoading
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                        'Update'
                                }
                            </button>
                        </div>
                    </form>

                }
            </div>
        </Layout>
    )
}

export default EditDriver