import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React from 'react';
import { useState , useRef } from 'react';
import FileInput from 'components/global/FileInput';
import SelectBox from 'components/global/SelectBox';
import DatePicker_ from 'components/global/Datepicker';

const EditBanner = () => {
    const imgRef = useRef(null);
    const [image , setImage] = useState('');

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Edit Banner' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
                <form className='shadow-bg p-4 mt-4 flex flex-col gap-4'>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Banner Name'
                        placeholder='Ex: Test banner'
                        />
                        <Input 
                        label='Description'
                        placeholder='Enter Banner Description'
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
                        <SelectBox 
                        label='Banner For'
                        options={[
                            { label : 'Category' , value : 1 } ,
                            { label : 'Inventory' , value : 2 } ,
                        ]}
                        />
                        <SelectBox 
                        label='Category'
                        options={[
                            { label : 'Category One' , value : 1 } ,
                            { label : 'Category Two' , value : 2 } ,
                            { label : 'Category Three' , value : 3 } ,
                        ]}
                        />
                        
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <DatePicker_ 
                        label='Start Date'
                        placeholder='Offer Start Date'
                        />
                        <DatePicker_ 
                        label='End Date Date'
                        placeholder='Offer End Date'
                        />
                    </div>
                    <div>
                        <Input 
                        label='Offer'
                        placeholder='Enter Banner Offer'
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

export default EditBanner;