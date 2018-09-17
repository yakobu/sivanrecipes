import React from 'react';
import SelectField from 'material-ui/SelectField';


const selection_field = (props) => (
    <SelectField
        multiple={true}
        hintText={props.label}
        value={props.values}
        style={{width: "90%"}}
        onChange={props.handleChange}
        selectionRenderer={props.selectionRenderer}>
        {props.children}
    </SelectField>
);

export default selection_field;
