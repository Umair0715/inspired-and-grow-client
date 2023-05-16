import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SelectBox from 'components/global/SelectBox';
import MultiFileInput from 'components/global/MultiFileInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from 'redux/actions/categoryActions';
import { ClipLoader } from 'react-spinners';
import { getMainSubCategories } from 'redux/actions/subCategoryActions';
import { deleteProductImage, editProduct, getProductDetails } from 'redux/actions/productActions';
import { baseURL } from 'config/api';

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

    const { id } = useParams();

    const { loading : catLoading , categories } = useSelector(state => state.category);
    const { loading : subCatLoading , subCategories } = useSelector(state => state.subCategory);

    const { updateLoading , productDetails , deleteLoading } = useSelector(state => state.inventory);

    useEffect(() => {
        dispatch(getProductDetails(id));
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if(mainCategory){
            dispatch(getMainSubCategories(mainCategory))
        }
    }, [mainCategory]);

    useEffect(() => {
        if(productDetails){
            setName(productDetails?.name);
            setPrice(productDetails?.price);
            setStock(productDetails?.stock);
            setUnit(productDetails?.unit);
            setMainCategory(productDetails?.mainCategory?._id);
            setSubCategory(productDetails?.subCategory?._id);
            setKeywords(productDetails?.keywords?.join())
            setDescription(productDetails?.description);
        }
    }, [productDetails])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name , unit , mainCategory , subCategory , 
            price : parseInt(price) , 
            stock : parseInt(stock) , 
            keywords : keywords.split(',') , 
        }
        if(images?.length > 0 ){
            data.images = images;
        }
        dispatch(editProduct(id , data , setImages ));
    }

    const deleteImage = (image) => {
        if(window.confirm('Are you sure? You want to delete this image?')){
            dispatch(deleteProductImage(id , { image }));
        }   
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
                            value={mainCategory}
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
                            value={subCategory}
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
                        <label className='font-semibold text-grayText '>
                            Product Images
                        </label>
                        <div className='flex items-center gap-4 flex-wrap mt-2'>
                            {
                                productDetails?.images?.map((item,i) => (
                                    <div
                                    key={i}
                                    className='relative'
                                    >
                                        <img 
                                        src={`${baseURL}/inventories/${item}`}
                                        alt={name}
                                        className='w-[250px] h-[150px] object-cover rounded-md border'
                                        />
                                        {
                                            deleteLoading
                                            ? 
                                                <ClipLoader size={15} color='red' />
                                            : 
                                                <div 
                                                className='absolute top-1 right-2 text-red-500  cursor-pointer text-xl'
                                                onClick={() => {
                                                    deleteImage(item);
                                                }}
                                                >
                                                    <i className="uil uil-trash"></i>
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
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
                        disabled={updateLoading}
                        >
                            {
                                updateLoading
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