import ReportStats from 'assets/svgs/ReportStatsSvg'
import ReportWaveSvg from 'assets/svgs/ReportWaveSvg'
import React from 'react'

const ReportCards = () => {
    return (
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 items-center justify-center gap-5 py-5  '>
            {/* card */}
            <div className=' shadow-lg border rounded-xl flex px-5 py-5  ' >
                <div>
                    <ReportStats />
                </div>
                <div>
                    <p className='text-grayText font-semibold text-xl  pt-4' >
                        Total Number of Users
                    </p>
                    <div className='flex justify-between items-center pt-5'>
                        <p className='text-green-500 py-2'>
                            22.8%
                        </p>
                        <span>
                            <ReportWaveSvg />
                        </span>
                    </div>
                </div>
            </div>
            {/* card */}
            <div className=' shadow-lg border rounded-xl flex px-5 py-5  ' >
                <div>
                    <ReportStats />
                </div>
                <div >
                    <p className='text-grayText font-semibold text-xl  pt-4' >
                        Total Number of Drivers
                    </p>
                    <div className='flex items-center justify-between pt-5'>
                        <p className='text-green-500 py-2'>
                            11.8%
                        </p>
                        <span>
                            <ReportWaveSvg />
                        </span>
                    </div>
                </div>
            </div>
            {/* card */}
            <div className=' shadow-lg border rounded-xl flex px-5 py-5  ' >
                <div>
                    <ReportStats />
                </div>
                <div>
                    <p className='text-grayText font-semibold text-xl  pt-4' >
                        Total Number of Transactions
                    </p>
                    <div className='flex justify-between items-center pt-5'>
                        <p className='text-green-500 py-2'>
                            11.8%
                        </p>
                        <span>
                            <ReportWaveSvg />
                        </span>
                    </div>
                </div>
            </div>
         

        </div>
    )
}

export default ReportCards
