import SubCatTable from 'components/categoryManagement/SubCatTable'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React from 'react'
import { Link } from 'react-router-dom'

const SubCategory = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <Heading title='Sub Categories' showIcon={false} />
                    <Link to='/category-management/sub-category/add'>
                        <button className="btn-primary py-1.5 px-8">Add New</button>
                    </Link>
                </div>
                <div className='mt-4'>
                    <SubCatTable />
                </div>
            </div>
        </Layout>
    )
}

export default SubCategory