import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React from 'react';
import { useState , useRef } from 'react';
import FileInput from 'components/global/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDriver } from 'redux/actions/driverActions';
import isBase64 from 'utils/isBase64';
import { ClipLoader } from 'react-spinners';

const AddDriver = () => {
    const imgRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image , setImage] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [location , setLocation] = useState('');
    const [password , setPassword] = useState('');
    const [route , setRoute] = useState('');

    const { createLoading } = useSelector(state => state.driver);

    const handleSubmit = e => {
        e.preventDefault();
        const data = { firstName , lastName , email , phone , location , password , route };
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(createDriver(data , navigate))
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Add New Driver' />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
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
                        type='password'
                        label='Password'
                        placeholder='Ex: **********'
                        value={password}
                        setValue={setPassword}
                        />
                    </div>
                    <Input 
                    label='Route'
                    placeholder='Enter driver Route'
                    value={route}
                    setValue={setRoute}
                    />
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
                        disabled={createLoading}
                        >
                            {
                                createLoading
                                ? 
                                    <ClipLoader size={20} color='white' />
                                : 
                                    'Create'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddDriver;