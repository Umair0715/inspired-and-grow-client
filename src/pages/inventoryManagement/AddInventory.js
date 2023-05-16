import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SelectBox from 'components/global/SelectBox';
import MultiFileInput from 'components/global/MultiFileInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from 'redux/actions/categoryActions';
import { ClipLoader } from 'react-spinners';
import { getMainSubCategories } from 'redux/actions/subCategoryActions';
import { createProduct } from 'redux/actions/productActions';

const AddInventory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [images , setImages] = useState([]);
    const [name , setName] = useState('')
    const [price , setPrice] = useState('');
    const [stock , setStock] = useState('')
    const [unit , setUnit] = useState('')
    const [keywords , setKeywords] = useState('')
    const [mainCategory , setMainCategory] = useState('')
    const [subCategory , setSubCategory] = useState('');
    const [description , setDescription] = useState('');

    const { loading : catLoading , categories } = useSelector(state => state.category);
    const { loading : subCatLoading , subCategories } = useSelector(state => state.subCategory);

    const { createLoading } = useSelector(state => state.inventory);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if(mainCategory){
            dispatch(getMainSubCategories(mainCategory))
        }
    }, [mainCategory])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name , unit , mainCategory , subCategory , 
            price : parseInt(price) , 
            stock : parseInt(stock) , 
            keywords : keywords.split(',') ,
            images , description 
        }
        dispatch(createProduct(data , navigate));
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Add Inventory' />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
                <form 
                className='shadow-bg p-4 mt-4 flex flex-col gap-4'
                onSubmit={handleSubmit}
                >
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        label='Name'
                        placeholder='Ex: Apple'
                        value={name}
                        setValue={setName}
                        required
                        />
                        <Input 
                        label='Keywords'
                        placeholder='Inventory Keywords'
                        value={keywords}
                        setValue={setKeywords}
                        required
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <Input 
                        type='number'
                        label='Stock'
                        placeholder='Available Stock'
                        value={stock}
                        setValue={setStock}
                        required
                        />
                        <Input 
                        label='Unit'
                        placeholder='Ex: KG'
                        value={unit}
                        setValue={setUnit}
                        required
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <div className='flex-1'>
                        {
                            catLoading 
                            ? 
                                <ClipLoader size={15} />
                            : 
                            <SelectBox
                            options={categories?.map(item => (
                                { value : item?._id , label : item?.name }
                            ))}
                            label='Category'
                            setValue={setMainCategory}
                            required
                            />
                        }
                        </div>
                        <div className='flex-1'>
                        {
                            subCatLoading 
                            ? 
                                <ClipLoader size={15} />
                            : 
                            <SelectBox
                            options={subCategories?.map(item => (
                                { value : item?._id , label : item?.name }
                            ))}
                            label='Sub Category'
                            setValue={setSubCategory}
                            required
                            />
                        }
                        </div>
                    </div>
                    <Input 
                    type='number'
                    label='Price'
                    placeholder='Ex: 100'
                    value={price}
                    setValue={setPrice}
                    required
                    />
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-grayText'>
                            Description
                        </label>
                        <textarea
                        placeholder='Description...' 
                        className='input h-[100px] resize-none' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <MultiFileInput 
                        images={images}
                        setImages={setImages}
                        />
                    </div>
                    <div className='mt-4'>
                        <button 
                        type="submit" 
                        className='btn-primary py-3 px-12'
                        disabled={createLoading }
                        >
                            {
                                createLoading 
                                ? 
                                    <ClipLoader size={20} color='white' />
                                : 
                                    'Submit'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddInventory;