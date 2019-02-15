import React, { Component } from 'react';

import TodoInput from './TodoInput/TodoInput';
import TodoItems from './TodoItems/TodoItems';
import UserDialog from './UserDialog/UserDialog';


import './reset.css';
import 'normalize.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoList: [],
      selectedId: [],
    }
  }

  // 更新newTodo窗口的内容
  reflashNewToDo(value) {
    this.setState({
      ...this.state,
      newTodo: value
    })
  }

  // 新增Todo
  addTodo() {
    let {todoList, newTodo} = this.state;
    // 不为空
    if(newTodo !== '') {
      let dataModel = {
        id: idMaker(),
        content: newTodo,
        status: '', // Complted or not
      }
      todoList.unshift(dataModel);
      this.setState({
        ...this.state,
        todoList: todoList
      });
    }
  }

  // 新增/删除selectedId，同时修改item的status
  toggleSelected(item) {
    let {selectedId} = this.state;

    console.log(item)

    if(selectedId.indexOf(item.id) < 0) {
      selectedId.push(item.id);
    } else {
      let index = selectedId.indexOf(id);
      selectedId.splice(index, 1);
    }
    this.setState({
      ...this.state,
      selectedId: selectedId
    });
  }

  // 删除Todo
  delTodo(id) {
    let { todoList } = this.state;
    todoList = todoList.filter(item => item.id !== id);
    this.setState({
      ...this.state,
      todoList: todoList
    });
  }

  render() {
    let {newTodo, todoList, selectedId} = this.state;
    return (
      <div className="App">
        <h1 className="todos-title">todos</h1>
        <div className="main-content">
          <TodoInput reflashNewToDo={this.reflashNewToDo.bind(this)}
                     addTodo={this.addTodo.bind(this)}
                     delTodo={this.delTodo.bind(this)}
                     newTodo={newTodo}
                     showSelectAll={todoList.length > 0 ? true : false}
          />
          {
            todoList.length > 0 &&
            <TodoItems Todolists={todoList} selectedId={selectedId}
                       toggleSelected={this.toggleSelected.bind(this)}
            />
          }

          <UserDialog />
        </div>
      </div>
    );
  }
}

export default App;

let id = 0;

function idMaker() {
  id += 1;
  return id;
}
