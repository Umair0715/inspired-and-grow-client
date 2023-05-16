import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';
import Pagination from 'components/global/pagination';
import { baseURL } from 'config/api';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { deleteCategory, getCategories } from 'redux/actions/categoryActions';
import { setCurrentPage } from 'redux/reducers/categoryReducer';
import useClickOutside from 'utils/clickOutside';

const MainCatTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);

    const { categories , currentPage , pages , loading  , deleteLoading } = useSelector(state => state.category); 

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    useEffect(() => {
        dispatch(getCategories())
    }, [currentPage]);

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure? You want to delete this item?')){
            await dispatch(deleteCategory(id))
            setShowDropMenu(false);
        }
    }

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            {
                loading 
                ? 
                    <Loader />
                : 
                categories?.length > 0 
                ? 
                    <>
                    <table className="w-full table-auto overflow-x-auto ">
                        <thead className="bg-lightSlate border-b text-sm">
                            <tr className='bg-secondary text-white'>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-center">
                                    Category Name
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-center">
                                    Image
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-right">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                        {
                                categories?.map((item , i) => (
                                    <tr
                                    key={i} 
                                    className="bg-white border-b transition duration-300 ease-in-out"
                                    >
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                        {i+1}
                                    </td>
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                        {item?.name}
                                    </td>
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                        <div className='flex items-center justify-center'>
                                            <img 
                                            src={baseURL + '/categories/' + item?.image} 
                                            alt={item?.name} 
                                            className='w-[100px] h-[70px] object-cover'
                                            />
                                        </div>
                                    </td>
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                        <div className='flex items-end justify-end relative' 
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
                                                    <div 
                                                    className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                                    onClick={() => {
                                                        navigate(`/category-management/main-category/edit/${item._id}`)
                                                    }} 
                                                    >
                                                        <span>Edit</span>
                                                    </div>
                                                    <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                                    onClick={() => deleteHandler(item._id)}
                                                    >
                                                        {
                                                            deleteLoading
                                                            ? 
                                                                <ClipLoader size={15} />
                                                            : 
                                                            <span>Delete</span>
                                                        }
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
                    </>
                : 
                    <ItemNotFound />

            }
        </div>
    )
}

export default MainCatTable;