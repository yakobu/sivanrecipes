import React from 'react';

import Classes from './FloatingActionButton.css'

const floating_action_button = (props) => (
    <div className={Classes.FloatActionButton} {...props}>
        <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
    </div>
);

export default floating_action_button;