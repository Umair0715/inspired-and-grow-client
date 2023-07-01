import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SelectBox from 'components/global/SelectBox';
import MultiFileInput from 'components/global/MultiFileInput';
import DatePicker_ from 'components/global/Datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, editCoupon, getCouponDetails } from 'redux/actions/couponActions';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Loader from 'components/global/Loader';

const EditCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name , setName] = useState('');
    const [couponType , setCouponType] = useState('');
    const [discountType , setDiscountType] = useState('');
    const [discount , setDiscount] = useState('');
    const [minOrder , setMinOrder] = useState('');
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');
    const [isActive , setIsActive] = useState('');

    const { loading , updateLoading , couponDetails} = useSelector(state => state.coupon);

    useEffect(() => {
        dispatch(getCouponDetails(id))
    }, [id]);

    useEffect(() => {
        if(couponDetails) {
            setName(couponDetails?.name)
            setDiscountType(couponDetails?.discountType)
            setDiscount(couponDetails?.discount)
            setCouponType(couponDetails?.couponType)
            setIsActive(couponDetails?.isActive)
            setStartDate(new Date(couponDetails?.startDate))
            setEndDate(new Date(couponDetails?.endDate))
            setMinOrder(couponDetails?.minOrder)
        }
    }, [couponDetails])


    const handleSubmit = async e => {
        e.preventDefault();
        const couponData = {
            name , couponType , discount , discountType , minOrder , isActive , 
            startDate , endDate
        }
        dispatch(editCoupon(id , couponData))
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Update Coupon' icon='pen' />
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
                                label='Name'
                                placeholder='Ex: test110'
                                value={name}
                                setValue={setName}
                                required
                                />
                                <SelectBox
                                options={[
                                    { label : 'First Order' , value : 'firstOrder' } , 
                                    { label : 'Default' , value : 'default' } , 
                                ]}
                                label='Coupon Type'
                                value={couponType}
                                setValue={setCouponType}
                                required
                                />
                            </div>
                            <div className='flex sm:flex-row flex-col gap-6'>
                                <SelectBox
                                options={[
                                    { label : 'Percentage' , value : 'percentage' } , 
                                    { label : 'Amount' , value : 'amount' } , 
                                ]}
                                label='Discount Type'
                                value={discountType}
                                setValue={setDiscountType}
                                required
                                />
                                <Input 
                                type='number'
                                label='Discount'
                                placeholder='Enter discount value'
                                value={discount}
                                setValue={setDiscount}
                                required
                                />
                            </div>
                            <div className='flex sm:flex-row flex-col gap-6'>
                                <Input 
                                label='Min Order'
                                placeholder='Minimum order price'
                                value={minOrder}
                                setValue={setMinOrder}
                                required
                                />
                                <SelectBox
                                options={[
                                    { label : 'Yes' , value : true } , 
                                    { label : 'No' , value : false } , 
                                ]}
                                label='Active'
                                value={isActive}
                                setValue={setIsActive}
                                required
                                />
                            </div>
                            <div className='flex sm:flex-row flex-col gap-6'>
                                <DatePicker_
                                label='Start Date'
                                placeholder='Select start date'
                                value={startDate}
                                setValue={setStartDate}
                                required
                                />
                                <DatePicker_
                                label='End Date'
                                placeholder='Select coupon end date'
                                value={endDate}
                                setValue={setEndDate}
                                required
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
                                            'Save'
                                    }
                                </button>
                            </div>
                        </form>
                }
            </div>
        </Layout>
    )
}

export default EditCoupon;