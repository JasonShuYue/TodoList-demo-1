import React, { Component } from 'react';

import {getCurrentUser, signOut} from './leanCloud/leanCloud';
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
      user: getCurrentUser() || {},
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
      todoList.push(dataModel);
      this.setState({
        ...this.state,
        todoList: todoList
      });
    }
  }

  // 新增/删除selectedId，同时修改item的status
  toggleSelected(item) {
    let {selectedId, todoList} = this.state;
    if(selectedId.indexOf(item.id) < 0) {
      selectedId.push(item.id);
      for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].id === item.id) {
          todoList[i].status = 'completed';
          break;
        }
      }
    } else {
      let index = selectedId.indexOf(id);
      selectedId.splice(index, 1);
      for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].id === item.id) {
          todoList[i].status = '';
          break;
        }
      }
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

  changeUser(user) {
    this.setState({
      ...this.state,
      user: user
    });
  }

  // 登出操作
  signOut() {
    signOut();
    this.setState({
      ...this.state,
      user: {}
    });
  }

  // 选择/取消选择所有item
  selectAll() {
    let {todoList, selectedId} = this.state;
    if(selectedId.length !== todoList.length) {
      todoList.map((item) => {
        if(selectedId.indexOf(item.id) < 0) {
          item.status = 'completed';
          selectedId.push(item.id);
        }
      });
      this.setState({
        ...this.state,
        todoList: todoList,
        selectedId: selectedId
      });
    } else {
      selectedId = [];
      for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].status === "completed") {
          todoList[i].status = '';
        }
      }
      this.setState({
        ...this.state,
        selectedId: selectedId
      });
    }
  }


  render() {
    let {newTodo, todoList, selectedId, user} = this.state;
    return (
      <div className="App">
        <div className="main-content">
          <h1 className="todos-title">todos</h1>
          <TodoInput reflashNewToDo={this.reflashNewToDo.bind(this)}
                     addTodo={this.addTodo.bind(this)}
                     delTodo={this.delTodo.bind(this)}
                     newTodo={newTodo}
                     showSelectAll={todoList.length > 0 ? true : false}
                     signOut={this.signOut.bind(this)}
                     selectAll={this.selectAll.bind(this)}
          />
          {
            todoList.length > 0 &&
            <TodoItems Todolists={todoList} selectedId={selectedId}
                       toggleSelected={this.toggleSelected.bind(this)}
            />
          }
          {
            !user.id && <UserDialog changeUser={this.changeUser.bind(this)} />
          }

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
