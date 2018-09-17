import React from 'react'
import Popup from "reactjs-popup";

import Classes from './Modal.css'


const modal = (props) => (
    <Popup trigger={props.triggerElement} modal position="right center">
        {close => (
            <div className={Classes.Modal}>
                <a className={Classes.Close} onClick={close}>
                    &times;
                </a>
                <div className={Classes.Header}>
                    {props.headerContent}
                </div>
                <div className={Classes.Content}>
                    {props.children}
                </div>
                <div className={Classes.Actions}>
                    <button
                        className={Classes.ModalButton}
                        onClick={(ev) => {
                            props.action(ev)
                            close();
                        }}>
                        {props.actionContent}
                    </button>
                </div>
            </div>)}
    </Popup>
);

export default modal;