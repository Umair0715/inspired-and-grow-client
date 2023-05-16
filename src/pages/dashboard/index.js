import Cards from 'components/dashboard/Cards';
import OrdersList from 'components/dashboard/OrdersList';
import TopCustomers from 'components/dashboard/TopCustomers';
import TopSellings from 'components/dashboard/TopSellings';
import TotalRevenue from 'components/dashboard/TotalRevenue';
import Layout from 'components/global/Layout';
import { useState } from 'react'

const Dashboard = () => {
    const [filter , setFilter] = useState('');
   
    return (
        <Layout>
            <div className='flex flex-col gap-8'>
                <div>
                    <Cards />
                </div>
                <div>
                    <TotalRevenue />
                </div>
                {/* <div>
                    <OrdersList />
                </div> */}
                <div>
                    <TopSellings />
                </div>
                <div>
                    <TopCustomers />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard