import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React from 'react';
import { useState , useRef } from 'react';
import FileInput from 'components/global/FileInput';

const AddDriver = () => {
    const imgRef = useRef(null);
    const [image , setImage] = useState('');

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
                <form className='shadow-bg p-4 mt-4 flex flex-col gap-4'>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='First Name'
                        placeholder='Ex: John'
                        />
                        <Input 
                        label='Last Name'
                        placeholder='Ex: Doe'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Email'
                        placeholder='Ex: example@gmail.com'
                        />
                        <Input 
                        label='Phone Number'
                        placeholder='Ex: +91889328992'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Location'
                        placeholder='Ex: Mumbai , India'
                        />
                        <Input 
                        label='Password'
                        placeholder='Ex: ********'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Route'
                        placeholder='Ex: Example Route'
                        />
                    </div>
                    <div>
                        <FileInput 
                        label='Image'
                        itemRef={imgRef}
                        value={image}
                        setValue={setImage}
                        />
                    </div>
                    <div className='mt-4'>
                        <button 
                        type="submit" 
                        className='btn-primary py-3 px-12'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddDriver;