import Pagination from 'components/global/pagination';
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux'
import { setCurrentPage } from 'redux/reducers/ProductReviewsReducer';

const ReviewsTable = () => {
    const { reviews , currentPage , pages } = useSelector(state => state.productReview);

    return (
        <div className="overflow-x-auto bg-pure mt-8 mb-6 rounded-lg border shadow-md pb-12">
            <table className="w-full table-auto">
                <thead className="bg-lightSlate border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            REVIEWER
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            REVIEW
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                            RATING
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
                            DATE
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                   {
                        reviews?.map((item , i) => (
                            <tr className="bg-white border-b transition duration-300 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item?.user?.firstName + " " + item?.user?.lastName}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item?.review}
                            </td>
                            <td>
                                <div className='flex items-center justify-center'>
                                    <div className='bg-cyan-100 text-cyan-500 w-fit px-2 rounded-md flex items-center gap-1'>
                                        <span>{item?.rating}</span>
                                        <i className="uil uil-star"></i>
                                    </div>
                                </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                                {moment(item?.createdAt).format('DD MMM YYYY')}
                            </td>
                        </tr>
                        ))
                   }
                
                </tbody>
            </table>
            <Pagination
            pageCount={pages}
            currentPage={currentPage}
            setPage={setCurrentPage}
            />
        </div>
    )
}

export default ReviewsTable