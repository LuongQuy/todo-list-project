import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    componentWillMount = () => {
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        }else{
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    } 
    
    
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-remove pull-right" onClick={this.onCloseForm}></span>
                    <h3 className="panel-title">{!id?'Thêm Công Việc':'Sửa công việc'}</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmitForm}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
