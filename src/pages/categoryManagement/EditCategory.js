import BackBtn from "components/global/BackBtn";
import FileInput from "components/global/FileInput";
import Heading from "components/global/Heading";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import Loader from "components/global/Loader";
import { baseURL } from "config/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { createCategory, editCategory, getCategoryDetails } from "redux/actions/categoryActions";
import isBase64 from "utils/isBase64";

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image , setImage] = useState('');
    const [name , setName] = useState('');
    const { id } = useParams();

    const { updateLoading , loading , categoryDetails } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategoryDetails(id));
    } ,[])

    useEffect(() => {
        if(categoryDetails){
            setName(categoryDetails?.name);
            setImage(baseURL + "/categories/" + categoryDetails?.image)
        }
    }, [categoryDetails])

    const handleSubmit =  (e) => {
        e.preventDefault();
        const data = { name }
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(editCategory(id , data))
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <Heading title="Update Category" icon='pen' />
                    <BackBtn />
                </div>
                {
                    loading
                    ? 
                        <Loader />
                    : 
                        <div
                        onSubmit={handleSubmit}
                        className="shadow-bg rounded-md mt-3 pt-2 pb-4 px-4">
                            <form className="flex flex-col gap-4 mt-4">
                                <Input 
                                label="Name" 
                                placeholder="Enter Category Name" 
                                required 
                                value={name}
                                setValue={setName}
                                />
                                <FileInput
                                label='Image'
                                value={image}
                                setValue={setImage}
                                />
                                <div className="mt-4">
                                    <button 
                                    className="btn-primary py-1.5 px-6 w-fit"
                                    disabled={!name || updateLoading}
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

                }
            </div>
        </Layout>
    );
};

export default EditCategory;
