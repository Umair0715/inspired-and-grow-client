import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout';
import OrdersTable from 'components/orderManagement/OrdersTable';
import users from 'data/users';
import { useState } from 'react';

const DriverDetails = () => {
    const [user , setUser] = useState(users[0]);

    return (
        <Layout>
            <div>
                <BackBtn />
                <div>
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <img 
                        src={user?.img} 
                        alt={user.name} 
                        className='w-[100px] h-[100px] rounded-full object-cover'
                        />
                        <div className='text-center text-grayText'>
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h3 className='heading-sm'>Orders</h3>
                        <OrdersTable showPagination={true} ordersCount={6} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DriverDetails