import React, {Component} from 'react';
import './App.css';
import Header from "./components/HeaderTodo/header";
import TodoInput from "./components/InputComponent/TodoInput";
import TodoItem from "./components/TodoItem/TodoItem";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todoList:
                Object.keys(localStorage).sort((a,b) => {return a-b}).map((values) => {
                    return values;
                }),
            nextId: Object.keys(localStorage).length === 0 ? 0 : +Object.keys(localStorage).sort((a,b) => {return a-b})[localStorage.length - 1] + 1,
            edit: false
        };
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    addTodo(todo) {
        let todoList = this.state.todoList.slice();
        todoList.push({id: this.state.nextId, text: todo});
        localStorage.setItem(this.state.nextId, todo);

        this.setState({
            todoList: todoList,
            nextId: this.state.nextId+1
        });
    }


    removeTodo(id) {
        this.setState({
            todoList: this.state.todoList.filter((todo) => todo.id !== id)
        })
        localStorage.removeItem(id);
    }

    editTodo(id) {
        this.setState({
            todoList: this.state.todoList.map((todo) => todo.id === id)
        })
    }

    render() {
        return (
            <div className="App">
                <div className="todo-wrapper">
                    <Header />
                    <TodoInput addTodo={this.addTodo}/>
                    <ul>
                        {
                            /*this.state.todoList.map((todo) => {
                                //return <TodoItem todo={todo} key={} id={todo.id} removeTodo={this.removeTodo}/>

                            })*/
                            Object.keys(localStorage).sort((a,b) => {return a-b}).map((value) => {
                                return <TodoItem todo={value} key={value} id={value} editTodo={this.editTodo} removeTodo={this.removeTodo}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        ); // editTodo={this.editTodo}
    }
}

export default App;
