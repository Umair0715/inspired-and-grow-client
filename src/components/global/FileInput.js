import Img1 from 'assets/images/img1.jpg';
import { useRef } from 'react';


const FileInput = ({ label , value , setValue }) => {
    const imgRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setValue(reader.result);
        }
    }

    return (
        <div>
            <div className='flex-1 flex flex-col gap-2'>
                <label className='text-grayText font-semibold'>
                    {label}
                </label>
                <input 
                type="file" 
                ref={imgRef}
                onChange={handleFileChange}
                hidden
                />
                <div className='flex items-center justify-between border px-3 rounded-md cursor-pointer'
                onClick={() => (
                    imgRef?.current?.click()
                )}
                > 
                    <div>Choose File</div>
                    <div className='py-3 px-6 border-l'>Browse</div>
                </div>
            </div>
            <div 
            className='mt-4 border-2 border-dashed w-fit' 
            >
                <img 
                src={value || Img1} 
                alt="" 
                className='w-[350px] h-[200px] object-cover' 
                />
            </div>
        </div>
    )
}

export default FileInput