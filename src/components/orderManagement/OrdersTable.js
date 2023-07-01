import OrderStatus from 'components/global/OrderStatus';
import Pagination from 'components/global/pagination';
import PaymentStatus from 'components/global/PaymentStatus';
import moment from 'moment';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentPage } from 'redux/reducers/orderReducer';
import useClickOutside from 'utils/clickOutside';

const OrdersTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { orders , currentPage , pages  } = useSelector(state => state.order);
    
    useClickOutside(dropMenuRef , () => setShowDropMenu(false));
    
    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-sm">
                    <tr className='bg-secondary text-white'>
                        
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            CUSTOMER
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Items
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            LOCATION
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            AMOUNT
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            ORDER STATUS
                        </th>   
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            ACTIONS
                        </th>
                        
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {
                        orders?.map((item , i) => (
                            <tr
                            key={item?._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.user?.firstName + ' ' + item?.user?.lastName}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(item?.createdAt).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.orderItems?.length}
                            </td>
                            <td className=" text-gray-900  px-6 py-4">
                                {item?.shippingInfo?.address}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.totalPrice} : INR
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <OrderStatus 
                                status={item?.orderStatus} 
                                />
                            </td>
                            <td className="text-gray-900  px-6 py-4 whitespace-nowrap">
                                <div className='flex items-end justify-center relative' 
                                >  
                                    <div className='bg-gray-500 py-1.5 px-4 flex items-center rounded-md text-pure gap-2 text-lg w-fit cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDropMenu(prev => !prev);
                                        setSelectedMenuIndex(i);
                                    }}
                                    >
                                        <div><i className="uil uil-setting"></i></div>
                                        <div><i className="uil uil-angle-down"></i></div>
                                    </div>
                                {/* DROP MENU */}
                                {   
                                        showDropMenu && selectedMenuIndex === i &&
                                        <div className='absolute top-10  bg-pure shadow-lg w-[120px] h-auto rounded-lg z-[50] border flex flex-col'
                                        ref={dropMenuRef}
                                        >
                                            <Link 
                                            to={`/order-management/order-details/${item?._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>View</span>
                                            </Link>
                                            {/* <div 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            >
                                                <span>Delete</span>
                                            </div> */}
                                            {/* <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer'>
                                                Delete
                                            </div> */}
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                        ))
                   }
                
                </tbody>
            </table>
            {
                <Pagination 
                currentPage={currentPage}
                pageCount={pages}
                setPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default OrdersTable;