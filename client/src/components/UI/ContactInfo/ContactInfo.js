import React from 'react';

import Classes from './ContactInfo.css'
import logo from '../../../assets/Chef_book.svg'

const contact_info = (props) => (
    <div className={Classes.ContactInfo}>
        <h3>{props.header}</h3>
        <img src={logo} className={Classes.AppLogo} alt="logo" />
    </div>
);

export default contact_info;
