import React from 'react';

import AppBar from 'material-ui/AppBar';

const tool_bar = (props) => (
    <AppBar style={{background: "#2196f3", position: "fixed", fontFamily: "'Tinos', serif"}}
            title={<span style={{color: "#fff", margin: 10, cursor:"pointer"}}>טעים</span>}
            onTitleClick={props.onTitleClick}
            dir="rtl"
            showMenuIconButton={props.isAuth}
            onLeftIconButtonClick={props.isAuth ? props.toggle_sidedrawer : null}
            onRightIconButtonClick={props.isAuth ? props.click : null}>
    </AppBar>
);

export default tool_bar;