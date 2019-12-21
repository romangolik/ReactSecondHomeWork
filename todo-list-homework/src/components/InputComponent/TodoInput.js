import React from "react";
import "./TodoInput.scss"

export default class TodoInput extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    addTodo(todo) {
        if(todo.length > 0) {
            this.props.addTodo(todo);
            this.setState({value: ""});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Enter new todo" value={this.state.value} onChange={this.handleChange} className="input-add-todo"/>
                <button className="button-add" onClick={() => this.addTodo(this.state.value)}>Add</button>
            </form>
        )
    }
}