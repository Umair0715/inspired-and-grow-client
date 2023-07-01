import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import OrderStatus from 'components/global/OrderStatus'
import { baseURL } from 'config/api'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { getOrderDetails, updateOrder } from 'redux/actions/orderActions'

const img = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg'
const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');
    const { loading , updateLoading , orderDetails : item } = useSelector(state => state.order) 

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [id]);

    useEffect(() => {
        if(item) {
            setStatus(item?.orderStatus)
        }
    }, [item]);

    const handleChange = (e) => {
        if(window.confirm('Are you sure? You want to update order status? ')) {
            setStatus(e.target.value);
            dispatch(updateOrder(id , { orderStatus : e.target.value }));
        }
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                    <Heading title='Order Details' showIcon={false} />
                    <BackBtn />
                </div>
                {
                    loading 
                    ? 
                        <Loader />
                    : 
                        <div className='mt-6 shadow-bg p-4'>
                            <div className='flex items-center justify-between' >
                                <div className='flex items-center gap-12'>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-dark'>
                                            Order ID :
                                        </h4>
                                        <p className='text-gray-500'>
                                            {item?._id}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-dark'>
                                            Date :
                                        </h4>
                                        <p className='text-gray-500'>
                                            {moment(item?.createdAt).format('DD MMM YYYY')}
                                        </p>
                                    </div>
                                    <div>
                                        <OrderStatus status={item?.orderStatus} />
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h4 className='font-semibold text-dark'>
                                            Status :
                                        </h4>
                                        {
                                            updateLoading
                                            ? 
                                                <ClipLoader size={15} />
                                            :
                                                <select 
                                                className='select-box'
                                                onChange={handleChange}
                                                value={status}
                                                >
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="processing">
                                                        Processing
                                                    </option>
                                                    <option value="delivered">
                                                        Delivered
                                                    </option>
                                                    <option value="returned">
                                                        Returned
                                                    </option>
                                                    <option value="cancelled">
                                                        Cancelled
                                                    </option>
                                                </select>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className='flex items-center gap-2'>
                                <h4 className='font-semibold text-dark'>
                                    Delivery :
                                </h4>
                                <p className='text-gray-500'>
                                    {item?.shippingInfo?.address}
                                </p>
                            </div>
                            <div className='mt-8 border-t py-4'>
                                <h4 className='font-semibold text-dark'>Items</h4>
                                <div className='mt-4 flex flex-col gap-4'>
                                    {
                                        item?.orderItems?.map((p,i) => (
                                            <div key={p?._id} className='border-b pb-4'>
                                                <div className='flex items-center justify-between gap-2 '>
                                                    <div className='flex gap-2'>
                                                        <div className='border rounded-md p-1'>
                                                            <img src={img} className='w-[100px] h-[100px] rounded-md object-cover' />
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <h4 className='font-medium text-dark'>
                                                                {p?.product?.name}    
                                                            </h4>
                                                            <h6 className='font-medium'>
                                                                INR : {p?.product?.price}
                                                            </h6>
                                                            <div className='text-sm'>
                                                                Quantity : {p?.qty}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='font-semibold text-lg'>
                                                        {p?.product?.price + " * " + p?.qty + " = " + p?.product?.price * p?.qty}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='mt-2'>
                                <Heading title='Order Total' showIcon={false}/>
                                <div className='flex items-center justify-between gap-4 font-medium text-dark mt-6'>
                                    <h6>Sub-Total</h6>
                                    <p>
                                        {item?.orderItems?.reduce((acc , p) => (p?.product?.price * p?.qty) + acc , 0)}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between gap-4 font-medium text-dark mt-6'>
                                    <h6>Shipping</h6>
                                    <p>{item?.shippingPrice}</p>
                                </div>
                                <div className='flex items-center justify-between gap-4 font-semibold text-2xl mt-6'>
                                    <h6>Grand Total</h6>
                                    <p>
                                        INR : {item?.orderItems?.reduce((acc , p) => (p?.product?.price * p?.qty) + acc , 0) + item?.shippingPrice} 
                                    </p>
                                </div>



                            </div>
                        </div>

                }
            </div>
        </Layout>
    )
}

export default OrderDetails