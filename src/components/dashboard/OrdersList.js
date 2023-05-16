import OrdersTable from 'components/orderManagement/OrdersTable'
import React from 'react'

const OrdersList = () => {
    return (
        <div>
            <div className='flex items-center justify-between font-semibold text-primary'>
                <h6 className='text-grayText text-lg mb-2'>Order List</h6>
                <p>View All</p>
            </div>
            <div>
                <OrdersTable ordersCount={5} showPagination={false} />
            </div>
        </div>
    )
}

export default OrdersList