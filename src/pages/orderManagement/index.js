import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout'
import Search from 'components/global/Search'
import OrdersTable from 'components/orderManagement/OrdersTable'
import React from 'react'

const Orders = () => {
    return (
        <Layout>
            <div className='pb-12'>
                <div>
                    <BackBtn />
                </div>
                <div className='flex items-center justify-between gap-4 mt-4'>
                    <div>
                        <Search />
                    </div>
                    <div>
                        <select className='select-box'>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Declined</option>
                        </select>
                    </div>
                </div>
                <div className='mt-6'>
                    <OrdersTable />
                </div>
            </div>
        </Layout>
    )
}

export default Orders