import { Link } from 'react-router-dom';
import EarningImg from 'assets/images/earning.png';
import ScreensImg from 'assets/images/screens.png';
import BookingsImg from 'assets/images/bookings.png';
import CategoryImg from 'assets/images/cat.png';

const Cards = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                <div className='rounded-[2rem] bg-orange-500 text-white flex py-4 px-6 relative'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Total Earning</p>
                        <h3 className='text-3xl font-semibold'>$20k</h3>
                        <Link to='/earnings' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1'>
                        <img 
                        src={EarningImg} 
                        alt="Total Earnings"
                        className='w-full h-full object-cover' 
                        />
                    </div>
                </div>
                <div className='rounded-[2rem] bg-primary text-white flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Daily Orders</p>
                        <h3 className='text-3xl font-semibold'>20</h3>
                        <Link to='/earnings' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1'>
                        <img 
                        src={ScreensImg} 
                        alt="Total Earnings"
                        className='w-full h-full object-cover' 
                        />
                    </div>
                </div>
                <div className='rounded-[2rem] bg-pink-500 text-white flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Total Products</p>
                        <h3 className='text-3xl font-semibold'>150</h3>
                        <Link to='/earnings' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={BookingsImg} 
                        alt="Total Earnings"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
                <div className='rounded-[2rem] bg-blue-500 text-white flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Categories</p>
                        <h3 className='text-3xl font-semibold'>16</h3>
                        <Link to='/earnings' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={CategoryImg} 
                        alt="Total Categories"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards