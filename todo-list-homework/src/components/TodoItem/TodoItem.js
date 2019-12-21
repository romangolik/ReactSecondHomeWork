import React from "react";
import "./TodoItem.scss"

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: localStorage[this.props.id],
            edit: false
        }

        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    removeTodo(id) {
        this.props.removeTodo(id);
    }

    editTodo(id) {
        this.setState({
            edit: true
        })
    }

    renderNormal() {
        return (
            <div className="todoItem">
                <span className="text">{this.state.value}</span>
                <div className="buttons">
                <button className="btn editTodo" onClick={() => this.editTodo(this.props.id)}>Edit</button>
                <button className="btn removeTodo" onClick={() => this.removeTodo(this.props.id)}>Remove</button>
                </div>
            </div>
        )
    }

    saveTodo(id) {
        if(this.state.value.length > 0) {
            this.setState({
                edit: false
            })
            localStorage[id] = this.state.value;
        } else {
            alert("The line should not be empty!");
        }
    }

    renderEdit() {
        return (
            <div className="todoItem save">
                <input className="input-add-todo text-input" value={this.state.value} onChange={this.handleChange}/>
                <button className="btn saveTodo" onClick={() => this.saveTodo(this.props.id)}>Save</button>
            </div>
        )
    }

    render() {
        return this.state.edit?this.renderEdit():this.renderNormal();
    }
}