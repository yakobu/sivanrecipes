import React from 'react';

import Drawer from 'material-ui/Drawer';



const side_drawer = (props) => (
    <Drawer
        docked={false}
        width={200}
        open={props.open}
        onRequestChange={props.requestChange}
        openSecondary={true}
        disableSwipeToOpen={!props.isAuth}>
        {props.children}
    </Drawer>
);

export default side_drawer;