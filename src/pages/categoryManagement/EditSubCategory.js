import BackBtn from 'components/global/BackBtn'
import FileInput from 'components/global/FileInput'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import SelectBox from 'components/global/SelectBox'
import { baseURL } from 'config/api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { getCategories } from 'redux/actions/categoryActions'
import { editSubCategory ,  getSubCategoryDetails } from 'redux/actions/subCategoryActions'
import isBase64 from 'utils/isBase64'

const EditSubCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image , setImage] = useState('');
    const [name , setName] = useState('');
    const [mainCategory , setMainCategory] = useState('');
    const { categories , loading : mainCatLoading } = useSelector(state => state.category);
    const { updateLoading , categoryDetails : subCatDetails } = useSelector(state => state.subCategory )

    const { id } = useParams();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategoryDetails(id));
    }, []);

    useEffect(() => {
        if(subCatDetails){
            setName(subCatDetails?.name)
            setImage(`${baseURL}/categories/${subCatDetails?.image}`);
            setMainCategory(subCatDetails?.mainCategory?._id);
        }
    }, [subCatDetails])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name , mainCategory }
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(editSubCategory(id , data))
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
                            value={mainCategory}
                            setValue={setMainCategory}
                            />
                    }
                    <FileInput
                    label='Sub Category Image'
                    value={image}
                    setValue={setImage}
                    />
                    <div className='mt-2'>
                        <button 
                        className="btn-primary py-1.5 px-12 w-fit"
                        disabled={updateLoading || !name || !mainCategory}
                        >
                            {
                                updateLoading
                                ? 
                                    <ClipLoader size={20} color='white' />
                                : 
                                    'Update'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default EditSubCategory