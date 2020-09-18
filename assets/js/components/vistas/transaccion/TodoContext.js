import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			tipo: [],
			message: {}
		};
		this.readTodo();
		this.readUsuario();
	}

	//read
	readTodo() {
		axios
			.get('api/transaccion/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	readUsuario() {
		axios
			.get('api/tipo_transaccion/read')
			.then((response) => {
				this.setState({
					tipo: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//create
	createTodo(event, data) {
		console.log(data);
		event.preventDefault();
		axios
			.post('api/transaccion/create', data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					todos.push(response.data.todo);

					this.setState({
						todos: todos,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<TodoContext.Provider
				value={{
					...this.state,
					createTodo: this.createTodo.bind(this),
					setMessage: (message) => this.setState({ message: message })
				}}
			>
				{this.props.children}
			</TodoContext.Provider>
		);
	}
}

export default TodoContextProvider;
