import React, { useRef, useState } from 'react'
import useClickOutside from 'utils/clickOutside';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from 'config/api';
import Pagination from 'components/global/pagination';
import { setCurrentPage, setEditItem } from 'redux/reducers/productReducer';
import { deleteProduct } from 'redux/actions/productActions';
import { toast } from 'react-toastify';
 

const ProductsTable = () => {
    const dropMenuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    const { products , currentPage , pages } = useSelector(state => state.product);
    

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const editHandler = item => {
        dispatch(setEditItem(item));
        navigate(`/product/edit/${item?._id}`);
    }

    const deleteHandler = id => {
        if(window.confirm('Are you sure?. You want to delete this product?')){
            dispatch(deleteProduct(id , toast));
            setShowDropMenu(false);
        }
    }

    return (
        <div className="overflow-x-auto bg-pure  border  pb-20">
            <table className="w-full table-auto">
                <thead className="bg-lightSlate border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            NAME
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            IMAGE
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            PRICE
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            STOCK
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {
                        products?.map((item , i) => (
                            <tr className="bg-white border-b transition duration-300 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <Link to={`/product/details/${item?._id}`}>
                                    {item?.name}
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div>
                                    <img 
                                    src={`${baseURL}/products/${item?.images[0]}`} 
                                    alt="Product" 
                                    className='w-[100px] h-[110px] object-cover rounded-md'
                                    />
                                </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item?.price}$
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div className='bg-blue-100 w-fit font-semibold text-blue-400 rounded-md px-2'>
                                    {item?.stock}
                                </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
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
                                            <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer'
                                            onClick={() => editHandler(item)}
                                            >
                                                Edit
                                            </div>
                                            <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer'
                                            onClick={() => deleteHandler(item?._id)}
                                            >
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
            <div>
                <Pagination 
                currentPage={currentPage} 
                setPage={setCurrentPage} 
                pageCount={pages} 
                />
            </div>
        </div>
    )
}

export default ProductsTable