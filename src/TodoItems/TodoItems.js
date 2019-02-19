import React, { Component } from 'react';

import {updateTodoItem} from '../leanCloud/leanCloud';


import './TodoItems.css';

class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'All', // All / Active / Completed
            seenTodoList: [], // 呈现的list
            itemObj: {},
        };
    }

    toggleSelected(item) {
        this.props.toggleSelected.call(null, item);
    }

    // 改变item的状态
    changeSelectedType(value) {
        this.setState({
            ...this.state,
            selectedType: value
        });
    }

    // 更新item内容
    updateTodoItem(obj) {
        this.props.updateTodoItem(obj);
    }

    // 监听修改item时的回车事件
    onKeyDown(e) {
        let { itemObj } = this.state;
        // 获取item的内容
        let itemContent = e.target.textContent.trim();
        Object.assign(itemObj, {
            content: itemContent
        });
        this.setState({
            ...this.state,
            itemObj
        });
        if(e.key === 'Enter') {
            // 当为「回车」时，静止行为并取消焦点，更新item
            e.preventDefault();
            // 取消焦点
            e.target.blur();
            // 如果在item内容的两边加很多多余的「空格」，再次修改的时候自动筛去。
            e.target.innerText = itemContent;
            this.updateTodoItem(itemObj)
        }
    }

    // 监听item栏焦点移除事件
    onBlur(e) {
        let { itemObj } = this.state;
        let itemContent = e.target.textContent.trim();
        Object.assign(itemObj, {
            content: itemContent
        });
        this.setState({
            ...this.state,
            itemObj
        });
        // 如果在item内容的两边加很多多余的「空格」，再次修改的时候自动筛去。
        e.target.innerText = itemContent;
        this.updateTodoItem(itemObj)
    }

    // 点击item，获取当前item的id和content
    onFocusItem(e) {
        let {itemObj} = this.state;
        // 获取item的内容
        let itemContent = e.target.innerText;
        let id = '';
        // 获取item的id
        for(let key in e.target.attributes) {
            if(e.target.attributes[key].nodeName === 'item-id') {
                id = e.target.attributes[key].value;
            }
        }
        itemObj = {
            id: id,
            content: itemContent
        }
        this.setState({
            ...this.state,
            itemObj
        })
    }

    // 过滤Todolist
    filterTodoList(Todolists, selectedType) {
        let arr = [];
        switch(selectedType) {
            case 'All':
                arr = Todolists;
                break;
            case 'Active':
                arr = Todolists.filter(v => v.status !== 'completed');
                break;
            case 'Completed':
                arr = Todolists.filter(v => v.status === 'completed');
                break;
            default:
                break;
        }

        return arr;
    }

    // 删除单个Item
    delTodo(id) {
        this.props.delTodo.call(null, id);
    }

    // 批量删除
    batchDelTodo() {
        this.props.batchDelTodo.call(null);
    }

    render() {

        let {selectedId, Todolists} = this.props;
        let {selectedType} = this.state;
        let leftNumber = Todolists.length - selectedId.length;
        let filterList = this.filterTodoList(Todolists, selectedType);

        let todos = filterList.map(
            (item, index) => {
                let selected = selectedId.indexOf(item.id) >= 0;
                return (
                    <li className={`todo-item ${selected ? 'completed' : ''}`} key={index} item-id={item.id}
                        onBlur={(e) => this.onBlur(e)}
                        onKeyPress={(e) => this.onKeyDown(e)}
                        onFocus={(e) => this.onFocusItem(e)}
                    >
                        <div className="check-wrapper" onClick={() => this.toggleSelected(item)}>
                            <svg className={`icon icon-${selected ? 'checked' : 'unchecked'}`} aria-hidden="true">
                                <use xlinkHref={`#icon-${selected ? 'checked' : 'unchecked'}`}></use>
                            </svg>
                        </div>
                        <p className="item-content" contentEditable={true}
                           suppressContentEditableWarning={true}
                           item-id={item.id}
                        >
                            {item.content}
                            {/*<svg className="icon icon-close" aria-hidden="true" onClick={() => this.delTodo(item.id)}>*/}
                                {/*<use xlinkHref="#icon-close"></use>*/}
                            {/*</svg>*/}
                        </p>
                    </li>
                );
            }
        );
        return (
            <div className="TodoItems">
                <ul className="todo-list">
                    {todos}
                </ul>
                <footer className={`TodoItems-footer clearfix`}>
                    <span className="left">{leftNumber} iterm{`${leftNumber > 1 ? 's' : ''}`} left</span>
                    <ul className="filters">
                        <li className={`filters-all ${selectedType === 'All' ? 'active' : ''}`} onClick={() => this.changeSelectedType('All')}>All</li>
                        <li className={`filters-active ${selectedType === 'Active' ? 'active' : ''}`} onClick={() => this.changeSelectedType('Active')}>Active</li>
                        <li className={`filters-completed ${selectedType === 'Completed' ? 'active' : ''}`} onClick={() => this.changeSelectedType('Completed')}>Completed</li>
                    </ul>
                    <span className="clear-completed" onClick={() => this.batchDelTodo()}>Clear completed</span>
                </footer>
            </div>
        );
    }
}

export default TodoItems;