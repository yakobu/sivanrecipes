import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import Classes from './Spinner.css'

const spinner = () => (
    <div className={Classes.Spinner}>
        <CircularProgress style={{margin: "auto"}} size={80} thickness={5}/>
    </div>
);

export default spinner;