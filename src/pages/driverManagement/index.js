import DriversTable from 'components/driverManagement/DriversTable';
import Layout from 'components/global/Layout';
import Search from 'components/global/Search';
import React from 'react'
import { Link } from 'react-router-dom';

const Drivers = () => {
    return (
        <Layout>
            <div className='flex items-center justify-between'>
                <div>
                    <Search />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/driver-management/add-new'>
                        <button className="btn-primary py-2 px-12">ADD</button>
                    </Link>
                </div>
            </div>
            <div className='my-6'>
                <DriversTable />
            </div>
        </Layout>
    )
}

export default Drivers;