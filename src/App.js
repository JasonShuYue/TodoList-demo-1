import React, { Component } from 'react';

import {getCurrentUser, signOut, addTodo, batchUpdateTodos, fetchAllTodos, delTodo, batchDelTodo, updateTodoItem} from './leanCloud/leanCloud';
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
    let {todoList, newTodo, user} = this.state;
    let successFn = (todo) => {
      todoList.push(todo);
      this.setState({
        ...this.state,
        todoList: todoList
      });
    };
    let errorFn =  (error) => {
      alert(error);
    };

    // 输入内容两边去空
    newTodo = newTodo.trim();

    // 不为空
    if(newTodo !== '') {
      let dataModel = {
        userId: user.id,
        content: newTodo,
        status: 'active', // Complted or not
      };
      addTodo(dataModel, successFn, errorFn);
    }
  }

  // 直接删除单个Todo
  delTodo(id) {
    let successFn = (todo) => {
      this.fetchAllTodos();
    }
    delTodo(id, successFn, null);
  }

  // 批量删除Todo
  batchDelTodo() {
    let { selectedId } = this.state;
    let succesFn = () => {
      this.setState({
        ...this.state,
        selectedId: []
      });
      this.fetchAllTodos();
    }
    batchDelTodo(selectedId, succesFn, null)
  }

  // 更新item内容
  updateTodoItem(obj) {
    let successFn = () => {
      this.fetchAllTodos();
    };
    updateTodoItem(obj, successFn, null);
  }

  // 批量更新Todos
  batchUpdateTodos(idList, type, successFn) {
    batchUpdateTodos(idList, type, successFn, null);
  }

  // 选择/取消选择所有item
  selectAll() {
    let {todoList, selectedId} = this.state;
    let idList = todoList.map(v => v.id);
    if(selectedId.length !== todoList.length) {
      let successFn = () => {
        // 获取最新数据
        this.fetchAllTodos();
      };
      this.batchUpdateTodos(idList, 'completed', successFn)

    } else {
      let successFn = () => {
        // 获取最新数据
        this.fetchAllTodos();
      };
      this.batchUpdateTodos(idList, 'active', successFn)

    }
  }

  // 新增/删除selectedId，同时修改item的status
  toggleSelected(item) {
    let {selectedId} = this.state;
    if(selectedId.indexOf(item.id) < 0) {
      let successFn = () => {
        // 获取最新数据
        this.fetchAllTodos();
      }
      let idList = [item.id];
      this.batchUpdateTodos(idList, 'completed', successFn)
    } else {
      let successFn = () => {
        // 获取最新数据
        this.fetchAllTodos();
      };
      let idList = [item.id]
      this.batchUpdateTodos(idList, 'active', successFn)
    }

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
      user: {},
      newTodo: '',
      todoList: [],
      selectedId: []
    });
  }

  // 获取最新数据
  fetchAllTodos(callback) {
    let userId = this.state.user.id;
    let successFn = (todoList) => {
      let selectedId = [];
      for(let i = 0; i <  todoList.length; i++) {
        if(todoList[i].status === 'completed') {
          selectedId.push(todoList[i].id)
        }
      }
      this.setState({
        ...this.state,
        todoList: todoList,
        selectedId: selectedId
      });
      callback && callback();
    };
    fetchAllTodos(userId, successFn, null);
  }

  componentDidMount() {
    this.fetchAllTodos();
  }


  render() {
    let {newTodo, todoList, selectedId, user} = this.state;
    return (
      <div className="App">
        {
          user.id &&
          <div className="welcome-wrapper">
            <p className="welcome-tips">Welcome!<span className="user-name">{user.username}</span></p>
            <span className="signOut-btn" onClick={this.signOut.bind(this)}>Sign out</span>
          </div>
        }
        <div className="main-content">
          <h1 className="todos-title">todos</h1>

          <TodoInput reflashNewToDo={this.reflashNewToDo.bind(this)}
                     addTodo={this.addTodo.bind(this)}
                     newTodo={newTodo}
                     showSelectAll={todoList.length > 0 ? true : false}
                     signOut={this.signOut.bind(this)}
                     selectAll={this.selectAll.bind(this)}
          />
          {
            todoList.length > 0 &&
            <TodoItems Todolists={todoList} selectedId={selectedId}
                       toggleSelected={this.toggleSelected.bind(this)}
                       delTodo={this.delTodo.bind(this)}
                       batchDelTodo={this.batchDelTodo.bind(this)}
                       updateTodoItem={this.updateTodoItem.bind(this)}
            />
          }
          {
            !user.id && <UserDialog changeUser={this.changeUser.bind(this)}
                                    fetchAllTodos={this.fetchAllTodos.bind(this)}
            />
          }

        </div>
      </div>
    );
  }
}

export default App;

