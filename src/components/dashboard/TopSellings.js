import { products } from 'data/products'
import React from 'react'

const TopSellings = () => {
    return (
        <div>
            <div className=' flex items-center justify-between border-b pb-2'>
                <div className='flex items-center gap-2 text-lg text-grayText'>
                    <i className="uil uil-chart text-xl"></i>
                    <h4 className='font-semibold'>Top selling products</h4>
                </div>
                <div className='text-5xl text-grayText'>
                    <i className="uil uil-gift"></i>
                </div>
            </div>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 py-8'>
                {
                    products?.slice(0,9).map((item , i) => (
                        <div 
                        className='border-2 rounded-lg py-2 px-4 flex flex-col gap-2' 
                        key={i}
                        >
                            <div className='bg-orange-600 w-fit text-pure rounded-md py-1 px-4 text-[10px]'>Sold {item.sold}</div>
                            <div className='w-full h-[100px]'>
                                <img src={item?.img} alt={item?.name} className='w-full h-full object-cover'/>
                            </div>
                            <div className='text-center text-sm text-grayText'>
                                {item?.name}
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopSellings