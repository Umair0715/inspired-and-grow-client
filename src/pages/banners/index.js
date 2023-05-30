import Layout from 'components/global/Layout'
import Search from 'components/global/Search'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BannersTable from './BannersTable'
import Heading from 'components/global/Heading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBanners } from 'redux/actions/bannerActions'
import Loader from 'components/global/Loader'
import ItemNotFound from 'components/global/ItemNotFound'

const Banners = () => {
    const [search , setSearch] = useState('');

    const dispatch = useDispatch();
    const { banners , loading } = useSelector(state => state.banner);

    useEffect(() => {
        dispatch(getAllBanners(search));
    }, [dispatch]);

    const searchFetcher = (value) => {
        dispatch(getAllBanners(value))
    }

    return (
        <Layout>
            <div className='mb-6'>
                <Heading title='Banners' showIcon={false} />
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <Search fetcher={searchFetcher} setSearch={setSearch} />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/banners/add-new'>
                        <button className="btn-primary py-2 px-12">ADD New</button>
                    </Link>
                </div>
            </div>
            <div className='my-6'>
                {
                    loading 
                    ? 
                        <Loader />
                    : 
                    banners?.length > 0 
                    ? 
                        <BannersTable banners={banners} />
                    : 
                        <ItemNotFound />
                }
            </div>
        </Layout>
    )
}

export default Banners