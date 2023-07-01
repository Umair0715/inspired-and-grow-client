import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import ItemNotFound from 'components/global/ItemNotFound';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import Search from 'components/global/Search';
import AcceptedOrdersTable from 'components/orderManagement/AcceptedOrdersTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from 'redux/actions/orderActions';

const AcceptedOrders = () => {
    const dispatch = useDispatch();
    
    const { loading , orders , currentPage  } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getAllOrders('processing'))
    }, [currentPage])

    return (
        <Layout>
            <div className='pb-12'>
                <div>
                    <BackBtn />
                </div>
                <div className='flex items-center justify-between gap-4 mt-4'>
                    <Heading title='Accepted Orders' showIcon={false} />
                    {/* <div>
                        <Search />
                    </div> */}
                </div>
                <div className='mt-6'>
                    {
                        loading 
                        ? 
                            <Loader />
                        : 
                        orders?.length > 0 
                        ? 
                            <AcceptedOrdersTable />
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AcceptedOrders