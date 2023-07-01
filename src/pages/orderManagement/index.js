import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Search from 'components/global/Search'
import OrdersTable from 'components/orderManagement/OrdersTable'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from 'redux/actions/orderActions'

const Orders = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');
    
    const { loading , orders , currentPage  } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getAllOrders(status))
    }, [currentPage , status])

    return (
        <Layout>
            <div className='pb-12'>
                <div>
                    <BackBtn />
                </div>
                <div className='flex items-center justify-between gap-4 mt-4'>
                    <div>
                        <Heading title='All Orders' showIcon={false} />
                    </div>
                    <div>
                        <select 
                        className='select-box'
                        onChange={e => setStatus(e.target.value)}
                        value={status}
                        >
                            <option value='pending'>Pending</option>
                            <option value='processing'>Processing</option>
                            <option value='delivered'>Delivered</option>
                            <option value='returned'>Returned</option>
                            <option value='cancelled'>Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='mt-6'>
                    {
                        loading 
                        ? 
                            <Loader />
                        : 
                        orders?.length > 0 
                        ? 
                            <OrdersTable />
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Orders