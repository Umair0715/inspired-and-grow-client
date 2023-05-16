import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { deleteProduct } from 'redux/actions/productActions';
import { setCurrentPage } from 'redux/reducers/productReducer';
import useClickOutside from 'utils/clickOutside';

const InventoryTable = () => {
    const dispatch = useDispatch();

    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
 
    const { currentPage , pages , products , deleteLoading } = useSelector(state => state.inventory);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure? You want to delete this product?')){
            await dispatch(deleteProduct(id))
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
                            Category
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Sub Category
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Price
                        </th>
                        {/* <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Status
                        </th> */}
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                   {
                        products?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.mainCategory?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.subCategory?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                INR:{item?.price}
                            </td>
                            {/* <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.isActive ? 'Active' : "Disabled"}
                            </td> */}
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
                                            to={`/inventory-management/edit-inventory/${item?._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
                                            </Link>
                                            <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            onClick={() => deleteHandler(item?._id)}
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
    )
}

export default InventoryTable;