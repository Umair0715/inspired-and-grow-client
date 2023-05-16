import OrderStatus from 'components/global/OrderStatus';
import Pagination from 'components/global/pagination';
import PaymentStatus from 'components/global/PaymentStatus';
import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';

const OrdersTable = () => {
    

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-sm">
                    <tr className='bg-secondary text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            ORDER
                        </th>
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
                        [...Array(6).keys()]?.map((item , i) => (
                            <tr
                            key={i} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                4938d   
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                John Doe
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(new Date()).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                5
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Taxi/Rideshare Top
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                $255
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <OrderStatus 
                                status={i === 0 ? 'returned' : i === 1 ? 'failed' : i === 2 ? 'pending' :  'delivered'}
                                />
                            </td>
                            <td className="text-gray-900  px-6 py-4 whitespace-nowrap">
                                <div className='flex items-center justify-center gap-3'>
                                    <div className='accept'>
                                        <i className="uil uil-check"></i>
                                    </div>
                                    <div className='cancel'>
                                        <i className="uil uil-times"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))
                   }
                
                </tbody>
            </table>
            {
                <Pagination 
                currentPage={1}
                pageCount={5}
                setPage={1}
                />
            }
        </div>
    )
}

export default OrdersTable;