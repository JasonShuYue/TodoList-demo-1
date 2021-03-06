import React, { Component } from 'react';


import './TodoInput.css';

class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // 监听新建Todo内容
    newTodoOnChange(e) {
        let { reflashNewToDo } = this.props;
        let value = e.target.value;
        reflashNewToDo(value);
    }

    // 清空newTodo
    clearNewTodo() {
        let {reflashNewToDo} = this.props;
        reflashNewToDo('');
    }

    // 监听回车事件
    onKeyPress(e) {
        let { addTodo } = this.props;
        let key = e.key;
        if(key === "Enter") {
            // 新增Todo，然后清空input栏
            addTodo();
            this.clearNewTodo();
        }
    }

    render() {
        let { newTodo, showSelectAll, selectAll} = this.props;

        return(
            <div className="TodoInput">
                <div className={`selectAll-wrapper ${showSelectAll ? '' : 'hidden'}`}
                     onClick={() => selectAll()}
                >
                    <svg className="icon icon-arrow" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                    </svg>
                </div>
                <input className="new-todo" type="text" placeholder={tips}
                       value={newTodo}
                       onChange={this.newTodoOnChange.bind(this)}
                       onKeyPress={this.onKeyPress.bind(this)}
                />
            </div>
        );
    }
}


export default TodoInput;


let tips = "What needs to be done?"