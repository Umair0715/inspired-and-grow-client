import Pagination from 'components/global/pagination';
import moment from 'moment';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { deleteBanner } from 'redux/actions/bannerActions';
import { setCurrentPage } from 'redux/reducers/bannerReducer';
import useClickOutside from 'utils/clickOutside';

const BannersTable = ({ banners }) => {
    const dropMenuRef = useRef(null);
    const dispatch = useDispatch();
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { currentPage , pages , deleteLoading } = useSelector(state => state.banner);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const deleteHandler = async id => {
        if(window.confirm('are your sure? You want to delete this banner?')){
            await dispatch(deleteBanner(id));
            setShowDropMenu(false);
        }
    }

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
                        banners?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.description}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.offer}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(item?.startDate).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(item?.endDate).format('DD MMM YYYY')}
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
                                            to={`/banners/edit-banner/${item?._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
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
                                                        'Delete'
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

export default BannersTable;