import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Search from 'components/global/Search';
import PreBookingsTable from 'components/orderManagement/PreBookingsTable';

const PreBookings = () => {
    return (
        <Layout>
            <div className='pb-12'>
                <div>
                    <BackBtn />
                </div>
                <div className='flex items-center justify-between gap-4 mt-4'>
                    <Heading title='Pre Bookings' showIcon={false} />
                    <div>
                        <Search />
                    </div>
                </div>
                <div className='mt-6'>
                    <PreBookingsTable />
                </div>
            </div>
        </Layout>
    )
}

export default PreBookings