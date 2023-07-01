import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from 'redux/reducers/userReducer';
import { deleteUser } from 'redux/actions/userActions';

const UsersTable = ({ setRange }) => {
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    const [selectAll , setSelectAll] = useState(false);
    const [users, setUsers] = useState(usersData.map(item => (
        {...item , isSelected : false }
    )));

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

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
                return {...user, isSelected: !user.isSelected };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const { users : usersList , currentPage , pages } = useSelector(state => state.user);

    const deleteHandler = (userId) => {
        if(window.confirm('Are you sure? You want to delete this user?')){
            dispatch(deleteUser(userId));
        }
    }

    return (
        <div className="">
            
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-sm">
                    <tr className='bg-secondary text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            <div className='flex items-center gap-2'>
                                <input 
                                type="checkbox" 
                                id='select-all' 
                                onChange={handleSelectAll}
                                checked={selectAll}
                                />
                                <label htmlFor="select-all" >
                                    Select All
                                </label>
                            </div>
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Email
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Phone Number
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                   {
                        usersList?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div className='flex items-center gap-2'>
                                    <input 
                                    id={item._id}
                                    type="checkbox" 
                                    checked={item?.isSelected}
                                    onChange={() => handleSelectUser(item._id)}
                                    />
                                    <label htmlFor={item._id}>
                                        <i 
                                        className="uil uil-mobile-android-alt text-base"
                                        ></i>
                                    </label>
                                </div>                                
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <Link 
                                to={`/user-management/users/${item._id}`}
                                className='text-primary underline'
                                >
                                    {item?.firstName + " " + item?.lastName}
                                </Link>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.email}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.phone}
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
                                            to={`/user-management/edit-user/${item._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit User</span>
                                            </Link>
                                            <div 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            >
                                                <span>Block User</span>
                                            </div>
                                            <div
                                            onClick={() => deleteHandler(item?._id)} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer'>
                                            
                                                Delete
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
                currentPage={currentPage}
                pageCount={pages}
                setPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default UsersTable;