import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onSearch = (keyword) => {
        this.props.onSearch(keyword);
    }

    onSort = (sort) => {
        this.props.onSort(sort);
    }

    render() {
        return (
            <div className="row mt-15">
                <Search onSearch={this.onSearch} />
                <Sort onSort={this.onSort}/>
            </div>
        );
    }
}

export default Control;
