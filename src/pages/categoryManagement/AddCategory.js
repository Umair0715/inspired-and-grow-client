import FileInput from "components/global/FileInput";
import Heading from "components/global/Heading";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { createCategory } from "redux/actions/categoryActions";

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image , setImage] = useState('');
    const [name , setName] = useState('');

    const { createLoading } = useSelector(state => state.category);

    const handleSubmit =  (e) => {
        e.preventDefault();
        const data = { name , image }
        if(!image) return toast.error('Image is required.')
        dispatch(createCategory(data , navigate))
    }

    return (
        <Layout>
            <div>
                <Heading title="Add New Category" />
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
                            disabled={!image || !name || createLoading}
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
            </div>
        </Layout>
    );
};

export default AddCategory;
