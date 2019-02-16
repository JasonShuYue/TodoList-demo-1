import React, { Component } from 'react';

import {getCurrentUser, signOut, addTodo, fetchAllTodos} from './leanCloud/leanCloud';
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
      console.log('todotodo',todo)
      todoList.push(todo);
      this.setState({
        ...this.state,
        todoList: todoList
      });
    };
    let errorFn =  (error) => {
      alert(error);
    };

    // 不为空
    if(newTodo !== '') {
      let dataModel = {
        userId: user.id,
        content: newTodo,
        status: '', // Complted or not
      };
      addTodo(dataModel, successFn, errorFn);
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
      let index = selectedId.indexOf(item.id);
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
  // delTodo(idList) {
  //   let { selectedId } = this.state;
  //   this.setState({
  //     ...this.state,
  //     todoList: todoList
  //   });
  // }

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

  fetchAllTodos() {
    let userId = this.state.user.id;
    let successFn = (todoList) => {
      this.setState({
        ...this.state,
        todoList
      });
    };
    fetchAllTodos(userId, successFn, null);
  }

  componentDidMount() {
    this.fetchAllTodos();
  }


  render() {
    let {newTodo, todoList, selectedId, user} = this.state;
    // console.log('todoList', todoList)
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

