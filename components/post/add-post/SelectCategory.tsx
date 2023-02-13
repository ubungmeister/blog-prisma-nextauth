import React, {useCallback, useState} from 'react';
import Select from 'react-select';

const options=[
    {
        value: 'Cinema',
        label:  <div>Cinema</div>,
    },
    {
        value: 'Exhibition',
        label:  <div>Exhibition</div>,
    },
    {
        value: 'Concert',
        label:  <div>Concert</div>,
    }
]

export type OptionsType ={
    selectedCategory:(value:string,label:string)=>void
}

const SelectCategory = ({selectedCategory}:OptionsType) => {
    const [category, setCategory] =useState()
    const getValue = useCallback(() => {
        return options.find(c => c.value === category)
    },[category])
    const onChangeHandler = useCallback((e:any )=>{
        setCategory(e.constructor)
        selectedCategory(e.value,e.label)
    },[category])
    return (
        <div className='w-full md:w-2/3 w-5/6'>
            <Select
                className='border-none'
                placeholder='Category'
                classNamePrefix="Select"
                value={getValue()}
                onChange={onChangeHandler}
                options={options}

            />
            
        </div>
    );
};

export default SelectCategory;