import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout';
import React, { useEffect } from 'react';
import { useState , useRef } from 'react';
import FileInput from 'components/global/FileInput';
import SelectBox from 'components/global/SelectBox';
import DatePicker_ from 'components/global/Datepicker';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalProducts } from 'redux/actions/productActions';
import { getTotalCategories } from 'redux/actions/categoryActions';
import { ClipLoader } from 'react-spinners';
import { createBanner, editBanner, getBannerDetails } from 'redux/actions/bannerActions';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from 'config/api';
import isBase64 from 'utils/isBase64';


const AddNewBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name , setName] = useState('');
    const [description , setDescription] = useState('');
    const [type , setType] = useState('');
    const [bannerItem , setBannerItem] = useState('');
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');
    const [offer , setOffer] = useState('');
    const [image , setImage] = useState('');

    const { products , loading : productsLoading } = useSelector(state => state.inventory);
    const { categories , loading : categoiresLoading } = useSelector(state => state.category);

    const { updateLoading , loading , bannerDetails } = useSelector(state => state.banner);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getBannerDetails(id))
    }, [dispatch , id])

    useEffect(() => {
        if(bannerDetails){
            setName(bannerDetails?.name);
            setDescription(bannerDetails?.description)
            setStartDate(new Date(bannerDetails?.startDate))
            setEndDate(new Date(bannerDetails?.endDate))
            setType(bannerDetails?.type === 'Inventory' ? { label : 'Inventory' , value : 1 } : bannerDetails?.type === 'Category' ? { label : 'Category'  , value : 2 } : '' )
            setImage(baseURL + '/banners/' + bannerDetails?.image);
            setOffer(bannerDetails?.offer);
            setBannerItem(bannerDetails?.bannerItem)
        }
    }, [bannerDetails]);

    const handleTypeChange = (e) => {
        setType(e);
        if(e.value === 1) {
            dispatch(getTotalProducts())
        }else if(e.value === 2) {
            dispatch(getTotalCategories())
        }
    }

    useEffect(()=> {
        if(type?.value === 1) {
            dispatch(getTotalProducts())
        }else if(type?.value === 2) {
            dispatch(getTotalCategories())
        }
    }, [type])

    const handleSubmit = e => {
        e.preventDefault();
        const data = { name , description , startDate , endDate , offer , 
            type : type.label , bannerItem 
        };
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(editBanner(id , data , navigate));
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <div>
                        <Heading title='Update Banner' />
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
                        label='Banner Name'
                        placeholder='Ex: Test banner'
                        value={name}
                        setValue={setName}
                        />
                        <Input 
                        label='Description'
                        placeholder='Enter Banner Description'
                        value={description}
                        setValue={setDescription}
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <div className='flex flex-col gap-2 flex-1 w-full'>
                            <label clclassName='font-semibold text-grayText '>
                                Banner Type
                            </label>
                            <Select
                            options={[
                                { label : 'Inventory' , value : 1 } ,
                                { label : 'Category' , value : 2 }
                            ]}
                            className='outline-none w-full'
                            inputId='select-box-input'
                            onChange={handleTypeChange}
                            value={type}
                            />
                        </div>
                        {
                            productsLoading || categoiresLoading
                            ? 
                                <ClipLoader size={15} />
                            : 
                            type && 
                            <SelectBox 
                            label={type?.label}
                            options={
                                type?.value === 1 
                                ? 
                                products?.map(item => (
                                { label : item?.name , value : item?._id }
                                )) 
                                : 
                                type?.value === 2 
                                ?
                                categories?.map(item => (
                                    { label : item?.name , value : item?._id }
                                ))
                                : ''
                            }
                            value={bannerItem}
                            setValue={setBannerItem}
                            />
                        }
                    </div>
                    <div className='flex sm:flex-row flex-col gap-6'>
                        <DatePicker_ 
                        label='Start Date'
                        placeholder='Offer Start Date'
                        value={startDate}
                        setValue={setStartDate}
                        />
                        <DatePicker_ 
                        label='End Date Date'
                        placeholder='Offer End Date'
                        value={endDate}
                        setValue={setEndDate}
                        />
                    </div>
                    <div>
                        <Input 
                        label='Offer'
                        placeholder='Enter Banner Offer'
                        value={offer}
                        setValue={setOffer}
                        />
                    </div>
                    <div>
                        <FileInput 
                        label='Banner Image'
                        value={image}
                        setValue={setImage}
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
                                    'Update'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddNewBanner;