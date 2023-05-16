import CouponsTable from 'components/coupons/CouponsTable'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React from 'react'
import { Link } from 'react-router-dom'

const Coupons = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Coupons' showIcon={false} />
                    <Link to='/coupons/add-new' className="btn-primary py-2 5 px-6">
                        <button>Add Coupon</button>
                    </Link>
                </div>
                <div className='mt-6'>
                    <CouponsTable />
                </div>

            </div>
        </Layout>
    )
}

export default Coupons