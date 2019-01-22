import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }


    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }
    onDelete = (id) => {
        this.props.onDelete(id);
    }

    onUpdate = (id) => {
        this.props.onUpdate(id);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus)
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks } = this.props;
        var { filterName, filterStatus } = this.state;
        var elementTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={index}
                    index={index}
                    task={task}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                />);
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange} />
                                </td>
                                <td>
                                    <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elementTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskList;
