import BackBtn from 'components/global/BackBtn'
import FileInput from 'components/global/FileInput'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import SelectBox from 'components/global/SelectBox'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { getCategories, getTotalCategories } from 'redux/actions/categoryActions'
import { createSubCategory } from 'redux/actions/subCategoryActions'

const AddSubCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image , setImage] = useState('');
    const [name , setName] = useState('');
    const [mainCategory , setMainCategory] = useState('');
    const { categories , loading : mainCatLoading } = useSelector(state => state.category);
    const { createLoading } = useSelector(state => state.subCategory )

    useEffect(() => {
        dispatch(getTotalCategories())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name , image , mainCategory }
        dispatch(createSubCategory(data , navigate))
    }

    return (
        <Layout>
            <div className='flex items-center justify-between gap-4'>
                <Heading title='Add Sub Category' />
                <BackBtn />
            </div>
            <div className='shadow-bg rounded-md mt-3 pt-2 pb-4 px-4'>
                <form 
                className='flex flex-col gap-4 mt-4'
                onSubmit={handleSubmit}
                >
                    <Input
                    label='Sub Category Name'
                    placeholder='Ex : dry Fruits'
                    value={name}
                    setValue={setName}
                    required
                    />
                    {
                        mainCatLoading
                        ? 
                            <ClipLoader size={15} />
                        : 
                            <SelectBox 
                            label='Main Category'
                            options={categories?.map(item => (
                                { value : item?._id , label : item?.name}
                            ))}
                            setValue={setMainCategory}
                            />
                    }
                    <FileInput
                    label='Sub Category Image'
                    value={image}
                    setValue={setImage}
                    />
                    <div className='mt-2'>
                        <button className="btn-primary py-1.5 px-6 w-fit">
                            {
                                createLoading
                                ? 
                                    <ClipLoader size={20} color='white' />
                                : 
                                    'Create'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddSubCategory