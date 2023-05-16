import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';

const BannersTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
 

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));


    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-sm">
                    <tr className='bg-secondary text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Offer
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Start Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            End Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                   {
                        [...Array(6).keys()]?.map((item , i) => (
                            <tr
                            key={item.id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Fresh and healthy fruits
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Exciting Offers Flat 50% off on Fruits
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Fruits
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Sep 18, 2023
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Sep 28, 2023
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
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
                                            to={`/banners/edit-banner/340`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
                                            </Link>
                                            <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Delete</span>
                                            </div>
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
                currentPage={1}
                pageCount={5}
                setPage={1}
                />
            }
        </div>
    )
}

export default BannersTable;