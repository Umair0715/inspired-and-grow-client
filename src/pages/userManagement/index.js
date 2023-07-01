import Heading from 'components/global/Heading';
import ItemNotFound from 'components/global/ItemNotFound';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import Search from 'components/global/Search';
import UsersTable from 'components/userManagement/UsersTable';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from 'redux/actions/userActions';

const Users = () => {
    const dispatch = useDispatch();
    const [range , setRange] = useState('');
    const [search , setSearch] = useState('');

    const { currentPage , loading , users , docsCount } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUsers(range , search))
    }, [currentPage, range]);

    const searchFetcher = (value) => {
        dispatch(getAllUsers(range , value))
    }


    return (
        <Layout>
            <div className='flex items-center gap-2'>
                <Heading title='User Management' showIcon={false} />
                <div className='bg-gray-100 flex items-center justify-center py-1 rounded-md px-3'>
                    {docsCount || 0}
                </div>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <div>
                    <Search setSearch={setSearch} fetcher={searchFetcher} />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/user-management/add-new'>
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
                        <div className='shadow-bg overflow-x-auto rounded-lg'>
                            <div className='py-4 flex items-end justify-end px-4'>
                                <select 
                                className='select-box'
                                onChange={e => setRange(e.target.value)}
                                value={range}
                                >
                                    <option value="all">All</option>
                                    <option value="today">Today</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                </select>
                            </div>
                            {
                                users?.length > 0 
                                ? 
                                    <UsersTable setRange={setRange} />
                                : 
                                    <ItemNotFound />
                            }
                        </div>
                    
                }
            </div>
        </Layout>
    )
}

export default Users;