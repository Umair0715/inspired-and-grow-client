import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React from 'react';
import { useState } from 'react';
import SelectBox from 'components/global/SelectBox';
import MultiFileInput from 'components/global/MultiFileInput';
import DatePicker_ from 'components/global/Datepicker';

const AddCoupon = () => {
    const [images , setImages] = useState([]);

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Create New Coupon' />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
                <form className='shadow-bg p-4 mt-4 flex flex-col gap-4'>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Name'
                        placeholder='Ex: test110'
                        />
                        <SelectBox
                        options={[
                            { label : 'First Order' , value : 1 } , 
                            { label : 'Default' , value : 2 } , 
                        ]}
                        label='Coupon Type'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <SelectBox
                        options={[
                            { label : 'Percentage' , value : 1 } , 
                            { label : 'Amount' , value : 2 } , 
                        ]}
                        label='Discount Type'
                        />
                        <Input 
                        type='number'
                        label='Discount'
                        placeholder='Enter discount value'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Min Order'
                        placeholder='Minimum order price'
                        />
                        <SelectBox
                        options={[
                            { label : 'Yes' , value : 1 } , 
                            { label : 'No' , value : 2 } , 
                        ]}
                        label='Active'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <DatePicker_
                        label='Start Date'
                        placeholder='Select start date'
                        />
                        <DatePicker_
                        label='End Date'
                        placeholder='Select coupon end date'
                        />
                    </div>
                    
                    <div className='mt-4'>
                        <button 
                        type="submit" 
                        className='btn-primary py-3 px-12'
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddCoupon;