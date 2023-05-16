import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Search from 'components/global/Search'
import InventoryTable from 'components/inventoryManagement/InventoryTable'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from 'redux/actions/productActions'

const Inventories = () => {
    const dispatch = useDispatch();
    const [search , setSearch] = useState('');
    const { loading , products , currentPage } = useSelector(state => state.inventory);

    useEffect(() => {
        dispatch(getProducts(search))
    }, [currentPage]);

    const searchFetcher = (value) => {
        dispatch(getProducts(value))
    }

    return (
        <Layout>
            <Heading title='Inventories' showIcon={false} />
            <div className='flex items-center justify-between mt-5'>
                <div>
                    <Search setSearch={setSearch} fetcher={searchFetcher} />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/inventory-management/add-new'>
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
                    products?.length > 0 
                    ? 
                        <InventoryTable />
                    : 
                        <ItemNotFound />
                }
            </div>
        </Layout>
    )
}

export default Inventories