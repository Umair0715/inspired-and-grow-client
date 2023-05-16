import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import SelectBox from 'components/global/SelectBox'
import React from 'react'

const SubCatForm = () => {
    return (
        <div className='shadow-bg rounded-md mt-3 pt-2 pb-4 px-4'>
            <Heading title='Add Sub Category' />
            <form className='flex flex-col gap-4 mt-4'>
                <Input
                label='Sub Category Name'
                placeholder='Enter Sub Category Name'
                required
                />
                <SelectBox 
                label='Main Category'
                options={[
                    { label : 'Main Cat 1' , value : 1 } , 
                    { label : 'Main Cat 2' , value : 2 } , 
                    { label : 'Main Cat 3' , value : 3 } , 
                ]}
                />
                <button className="btn-primary py-1.5 px-6 w-fit">Submit</button>
            </form>
        </div>
    )
}

export default SubCatForm