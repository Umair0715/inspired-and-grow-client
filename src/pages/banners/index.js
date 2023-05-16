import Layout from 'components/global/Layout'
import Search from 'components/global/Search'
import React from 'react'
import { Link } from 'react-router-dom'
import BannersTable from './BannersTable'
import Heading from 'components/global/Heading'

const Banners = () => {
    return (
        <Layout>
            <div className='mb-6'>
                <Heading title='Banners' showIcon={false} />
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <Search />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/banners/add-new'>
                        <button className="btn-primary py-2 px-12">ADD New</button>
                    </Link>
                </div>
            </div>
            <div className='my-6'>
                <BannersTable />
            </div>
        </Layout>
    )
}

export default Banners