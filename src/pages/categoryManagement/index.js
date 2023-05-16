import MainCatTable from 'components/categoryManagement/MainCatTable'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import React from 'react'
import { Link } from 'react-router-dom'

const MainCategory = () => {


    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <Heading title='Categories' showIcon={false} />
                    <Link to='/category-management/main-category/add'>
                        <button className="btn-primary py-2 px-8">Add New</button>
                    </Link>
                </div>
                <div className='mt-6'>
                    <MainCatTable />
                </div>
            </div>
        </Layout>
    )
}

export default MainCategory