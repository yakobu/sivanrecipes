import React from 'react';
import Select from 'react-select';

const multi_selector = (props) => {
    const SelectComponent = props.createable ? Select.Creatable : Select;

    return <SelectComponent
        multi
        placeholder={props.placeholder}
        options={props.children}
        onChange={props.handleChange}
        value={props.value}
        rtl={true}
    />
};

export default multi_selector;