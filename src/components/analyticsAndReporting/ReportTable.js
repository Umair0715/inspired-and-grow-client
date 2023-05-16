import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'

const ReportTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [users, setUsers] = useState(usersData.map(item => (
        { ...item, isSelected: false }
    )));

    useClickOutside(dropMenuRef, () => setShowDropMenu(false));

    const handleSelectAll = (e) => {
        setSelectAll(!selectAll)
        const updatedUsers = users.map(user => {
            return { ...user, isSelected: !selectAll };
        });
        setUsers(updatedUsers);
    }

    const handleSelectUser = (id) => {
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return { ...user, isSelected: !user.isSelected };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-[13px]">
                    <tr className='bg-secondary text-white'>

                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Product Id
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Customer
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody className='text-[13px]'>
                    {
                        users.slice(1)?.map((item, i) => (
                            <tr
                                key={item.id}
                                className="bg-white border-b transition duration-300 ease-in-out"
                            >

                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    RZ17308
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    john
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    13/01/2022
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
                                                    to=''
                                                    className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                    <span>Edit User</span>
                                                </Link>
                                                <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                    <span>Block User</span>
                                                </div>
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
                    currentPage={1}
                    pageCount={5}
                    setPage={1}
                />
            }
        </div>
    )
}

export default ReportTable;