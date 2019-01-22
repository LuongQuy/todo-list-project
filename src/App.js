import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			isDisplayForm: false,
			taskEditting: null,
			filter: {
				name: '',
				status: -1
			},
			keyword: '',
			sort: {
				by: '',
				value: 1
			}
		}
	}

	s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	generateID() {
		return this.s4() + this.s4() + this.s4() + this.s4() + this.s4();
	}

	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			});
		}
	}

	onToggleForm = () => {
		if (this.state.isDisplayForm && this.state.taskEditting) {
			this.setState({
				taskEditting: null,
				isDisplayForm: true
			});
		} else {
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditting: null
			});
		}
	}

	onShowForm = () => {
		this.setState({
			isDisplayForm: true
		});
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false
		})
	}

	onSubmit = (data) => {
		var { tasks } = this.state;
		if (data.id) {
			var index = tasks.findIndex(task => task.id === data.id);
			tasks[index] = data;

		} else {
			data.id = this.generateID();
			tasks.push(data);
		}
		this.setState({
			tasks: tasks,
			taskEditting: null
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		var index = tasks.findIndex((task) => {
			return task.id === id;
		});
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}

	onDelete = (id) => {
		var { tasks } = this.state;
		var index = tasks.findIndex(task => {
			return task.id === id;
		});
		if (index !== -1) {
			tasks.splice(index, 1);
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		this.onCloseForm();
	}

	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = tasks.findIndex(task => {
			return task.id === id;
		});
		if (index !== -1) {
			this.setState({
				taskEditting: tasks[index]
			});
			this.onShowForm();
		}
	}

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus);
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})
	}

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword.toLowerCase()
		});
	}

	onSort = (sort) => {
		this.setState({
			sort: {
				by: sort.by,
				value: sort.value
			}
		})
	}

	render() {
		var { tasks, isDisplayForm, taskEditting, filter, keyword, sort } = this.state;
		if (filter) {
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				});
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) return task;
				else {
					return task.status === (filter.status === 1 ? true : false);
				}
			});
		}
		if(keyword){
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword) !== -1
			})
		}
		if(sort){
			if(sort.by === 'name'){
				tasks.sort((a, b) => {
					if(a.name > b.name) return -sort.value;
					else if(a.name < b.name) return sort.value;
					else return 0;
				})
			}else if(sort.by === 'status'){
				tasks.sort((a, b) => {
					if(a.status > b.status) return -sort.value;
					else if(a.status < b.status) return sort.value;
					else return 0;
				})
			}
		}

		var elementTaskForm = isDisplayForm ? <TaskForm task={taskEditting} onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} /> : '';
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
						{elementTaskForm}
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
							<span className="fa fa-plus mr-5"></span> Thêm Công Việc
                </button><br /><br />
						<Control onSearch={this.onSearch} onSort={this.onSort} />
						<br />
						<TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus}
							onDelete={this.onDelete} onUpdate={this.onUpdate}
							onFilter={this.onFilter}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
