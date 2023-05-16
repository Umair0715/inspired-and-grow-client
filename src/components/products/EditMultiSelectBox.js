
import Select from 'react-select';


const EditMultiSelectBox = ({ options , setselectedAttributes , selectedAttributes }) => {

    const handleChange = (selectedOptions) => {
        setselectedAttributes(selectedOptions);
    }

    
    return (
        <Select
            options={options?.filter((option) => !selectedAttributes?.some((attribute) => attribute.name === option.name))}
            className='outline-none focus:border-red-500'
            inputId='select-box-input'
            placeholder='---Select---'
            isMulti
            onChange={handleChange}
            value={selectedAttributes}
        />
    )
}

export default EditMultiSelectBox