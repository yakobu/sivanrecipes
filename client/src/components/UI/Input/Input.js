import React from 'react'

import TextField from 'material-ui/TextField';
import Aux from '../../../hoc/Aux/Aux'

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <TextField style={{width: "70%"}}
                                      inputStyle={{direction: "rtl"}}
                                      dir="ltr"
                                      {...props.elementConfig}
                                      value={props.value}
                                      onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <TextField style={{width: "100%"}}
                                      textareaStyle={{direction: "rtl"}}
                                      dir="ltr"
                                      multiLine={true}
                                      {...props.elementConfig}
                                      value={props.value}
                                      onChange={props.changed}/>;
            break;

        case ('file'):
            inputElement =
                <Aux>
                    <input style={{display: "none"}}
                           type="file"
                           onChange={props.changed}
                           ref={fileInput => this.fileInput = fileInput}/>

                    <TextField style={{width: "100%"}}
                               textareaStyle={{direction: "rtl"}}
                               dir="ltr"
                               {...props.elementConfig}
                               value={props.value}
                               onClick={() => this.fileInput.click()}/>
                </Aux>;
            break;

        default:
            inputElement = <TextField style={{width: "70%"}}
                                      inputStyle={{direction: "rtl"}}
                                      dir="ltr"
                                      {...props.elementConfig}
                                      value={props.value}
                                      onChange={props.changed}/>;
            break;
    }

    return inputElement
};

export default input;