import React, { Component } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        })
        this.props.onSort(this.state.sort);
    }

    render() {
        var {sort} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                                </span> <i className={sort.by === 'name' && sort.value === 1 ? "fa fa-check" : ""}></i>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a>
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                                </span> <i className={sort.by === 'name' && sort.value === -1 ? "fa fa-check" : ""}></i>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}><a>Trạng Thái Kích Hoạt <i className={sort.by === 'status' && sort.value === 1 ? "fa fa-check" : ""}></i></a></li>
                        <li onClick={() => this.onClick('status', 0)}><a>Trạng Thái Ẩn <i className={sort.by === 'status' && sort.value === 0 ? "fa fa-check" : ""}></i></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
