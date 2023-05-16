import React from 'react'
import { useSelector } from 'react-redux';

const ReviewRating = () => {
    const { productDetails : { stats } } = useSelector(state => state.product);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2  text-sm text-grayText'>
                <div className='w-[50px] text-[15px]'>5 star</div>
                <div className=' w-full h-3 bg-gray-200 rounded-full relative'>
                    <div className={`absolute top-0 left-0 
                    bg-yellow-400 rounded-full h-full `}
                    style={{
                        width : stats?.fiveStars > 0 
                        ? stats?.fiveStarPercentage + "%" : '0'
                    }}
                    ></div>
                </div>
                <div className='flex-[0.08] text-right'>
                    {stats?.fiveStars > 0 ? stats?.fiveStarPercentage : 0}%
                </div>
            </div>
            <div className='flex items-center gap-2  text-sm text-grayText'>
                <div className='w-[50px] text-[15px]'>4 star</div>
                <div className=' w-full h-3 bg-gray-200 rounded-full relative'>
                    <div className={`absolute top-0 left-0 
                    bg-yellow-400 rounded-full h-full`}
                    style={{
                        width : stats?.fourStars > 0 
                        ? stats?.fourStarPercentage + "%" : '0'
                    }}
                    ></div>
                </div>
                <div className='flex-[0.08] text-right'>
                    {stats?.fourStars > 0 ? stats?.fourStarPercentage : 0}%
                </div>
            </div>
            <div className='flex items-center gap-2  text-sm text-grayText'>
                <div className='w-[50px] text-[15px]'>3 star</div>
                <div className=' w-full h-3 bg-gray-200 rounded-full relative'>
                    <div className={`absolute top-0 left-0 
                    bg-yellow-400 rounded-full h-full`}
                    style={{
                        width : stats?.threeStars > 0 
                        ? stats?.threeStarPercentage + "%" : '0'
                    }}
                    ></div>
                </div>
                <div className='flex-[0.08] text-right'>
                    {stats?.threeStars > 0 ? stats?.threeStarPercentage : 0}%
                </div>
            </div>
            <div className='flex items-center gap-2  text-sm text-grayText'>
                <div className='w-[50px] text-[15px]'>2 star</div>
                <div className=' w-full h-3 bg-gray-200 rounded-full relative'>
                    <div className={`absolute top-0 left-0 
                    bg-yellow-400 rounded-full h-full`}
                    style={{
                        width : stats?.twoStars > 0 
                        ? stats?.twoStarPercentage + "%" : '0'
                    }}
                    ></div>
                </div>
                <div className='flex-[0.08] text-right'>
                    {stats?.twoStars > 0 ? stats?.twoStarPercentage : 0}%
                </div>
            </div>
            <div className='flex items-center gap-2  text-sm text-grayText'>
                <div className='w-[50px] text-[15px]'>1 star</div>
                <div className=' w-full h-3 bg-gray-200 rounded-full relative'>
                    <div className={`absolute top-0 left-0 
                    bg-yellow-400 rounded-full h-full`}
                    style={{
                        width : stats?.onwStar > 0 
                        ? stats?.onwStarPercentage + "%" : '0'
                    }}
                    ></div>
                </div>
                <div className='flex-[0.08] text-right'>
                    {stats?.oneStar > 0 ? stats?.oneStarPercentage : 0}%
                </div>
            </div>
            
        </div>
    )
}

export default ReviewRating;