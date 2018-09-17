import React from 'react';
import Pagination from 'rc-pagination';
import './Paging.css'

export default class extends React.Component {

    render() {
        return <Pagination onChange={this.props.onChange}
                           pageSize={this.props.mountPerPage}
                           current={this.props.currentPage}
                           total={this.props.total}
                           showLessItems
                           showTitle={false}/>;
    }
}
