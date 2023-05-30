import DriversTable from 'components/driverManagement/DriversTable';
import Layout from 'components/global/Layout';
import Search from 'components/global/Search';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers } from 'redux/actions/driverActions';
import { useEffect, useState } from 'react';
import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';

const Drivers = () => {
    const [search , setSearch] = useState('');

    const dispatch = useDispatch();
    const { drivers , loading } = useSelector(state => state.driver);

    useEffect(() => {
        dispatch(getAllDrivers(search));
    }, [dispatch]);

    const searchFetcher = (value) => {
        dispatch(getAllDrivers(value))
    }

    return (
        <Layout>
            <div className='flex items-center justify-between'>
                <div>
                    <Search setSearch={setSearch} fetcher={searchFetcher} />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/driver-management/add-new'>
                        <button className="btn-primary py-2 px-12">ADD</button>
                    </Link>
                </div>
            </div>
            <div className='my-6'>
                {
                    loading 
                    ? 
                        <Loader />
                    : 
                    drivers?.length > 0 
                    ? 
                        <DriversTable drivers={drivers} />
                    : 
                        <ItemNotFound />
                }
            </div>
        </Layout>
    )
}

export default Drivers;