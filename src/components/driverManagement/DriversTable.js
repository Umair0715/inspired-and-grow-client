import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { deleteDriver } from 'redux/actions/driverActions';
import { setCurrentPage } from 'redux/reducers/driverReducer';
import useClickOutside from 'utils/clickOutside';


const DriversTable = ({ drivers }) => {
    const dropMenuRef = useRef(null);
    const dispatch = useDispatch();
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const { deleteLoading , currentPage , pages } = useSelector(state => state.driver);

    const deleteHandler = async (itemId) => {
        if(window.confirm('Are you sure? You want to delete this driver?')){
            await dispatch(deleteDriver(itemId));
            setShowDropMenu(false);
        }
    }

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="bg-lightSlate border-b text-sm">
                    <tr className='bg-secondary text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Diver Name
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
                        drivers?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <Link 
                                to={`/driver-management/drivers/${item._id}`}
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
                                            to={`/driver-management/edit-driver/${item._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit Driver</span>
                                            </Link>
                                            <button className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            onClick={() => deleteHandler(item?._id)}
                                            disabled={deleteLoading}
                                            >
                                                <span>
                                                    {
                                                        deleteLoading
                                                        ? 
                                                            <ClipLoader size={15} />
                                                        : 
                                                            'Delete Driver'
                                                    }
                                                </span>
                                            </button>
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

export default DriversTable;