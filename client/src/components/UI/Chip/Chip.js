import React from 'react';

import Chip from 'material-ui/Chip';

const styles = {
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


function handleClick(e) {
    // Prevent parent click event
    e.stopPropagation();
}


export default class extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <Chip onClick={(event) => handleClick(event)}
                      style={{
                          margin: 4,
                          backgroundColor: this.props.color? this.props.color:"#c5cae9",
                          fontFamily: "'Miriam Libre', sans-serif"
                      }}>
                    {this.props.children}
                </Chip>
            </div>
        );
    }
}