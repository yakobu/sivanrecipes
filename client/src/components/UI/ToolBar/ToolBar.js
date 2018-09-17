import React from 'react';

import AppBar from 'material-ui/AppBar';
import {FlatButton} from "material-ui";

const tool_bar = (props) => (
    <AppBar style={{background: "#1a237e", position: "fixed", fontFamily: "'Tinos', serif"}}
            title={<span style={{color: "#fff", margin: 10, cursor:"pointer"}}>טעים</span>}
            onTitleClick={props.onTitleClick}
            dir="rtl"
            showMenuIconButton={props.isAuth}
            onLeftIconButtonClick={props.isAuth ? props.toggle_sidedrawer : null}
            iconElementRight={props.isAuth ? <FlatButton label={props.label}/> : null}
            onRightIconButtonClick={props.isAuth ? props.click : null}>
    </AppBar>
);

export default tool_bar;