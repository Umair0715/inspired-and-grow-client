import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';
import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { deleteCoupon, getAllCoupons } from 'redux/actions/couponActions';
import { setCurrentPage } from 'redux/reducers/couponReducer';
import useClickOutside from 'utils/clickOutside';

const CouponsTable = () => {
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { loading , deleteLoading , coupons , currentPage , pages  } = useSelector(state => state.coupon);
    
    useEffect(() => {
        dispatch(getAllCoupons());
    } , [currentPage])

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const deleteCouponHandler = async (id) => {
        if(window.confirm('Are you sure? You want to delete this item?')) {
            await dispatch(deleteCoupon(id));
            setShowDropMenu(false);
        }
    } 
    
    return (
        loading 
        ? 
            <Loader />
        : 
        coupons?.length > 0 
        ?
            <div className=" shadow-bg overflow-x-auto rounded-lg">
                <table className="w-full table-auto overflow-x-auto ">
                    <thead className="bg-lightSlate border-b text-sm">
                        <tr className='bg-secondary text-white'>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Coupon Type
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Discount Type
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Discount
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Min Order
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Status
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                    {
                        coupons?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.couponType}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.discountType}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.discount}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.minOrder}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.isActive ? 'Active' : 'Not Active'}
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
                                            to={`/coupons/edit/${item?._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
                                            </Link>
                                            <div 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            onClick={() => deleteCouponHandler(item?._id)}
                                            >
                                                {
                                                    deleteLoading
                                                    ? 
                                                        <ClipLoader size={15} />
                                                    : 
                                                        <span>Delete</span>
                                                }
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
                    currentPage={currentPage}
                    pageCount={pages}
                    setPage={setCurrentPage}
                    />
                }
            </div>
        : 
            <ItemNotFound />
    )
}

export default CouponsTable;