import React, { Component } from 'react';


import './TodoItems.css';

class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'All', // All / Active / Completed
            seenTodoList: [], // 呈现的list
        };
    }

    toggleSelected(item) {
        this.props.toggleSelected.call(null, item);
    }

    changeSelectedType(value) {
        this.setState({
            ...this.state,
            selectedType: value
        });
    }

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

    delTodo(id) {
        this.props.delTodo.call(null, id);
    }

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
                        onChange={(e) => console.log(e.target.value)}
                        onDoubleClick={(e) => console.log(e.target)}
                    >
                        <div className="check-wrapper" onClick={() => this.toggleSelected(item)}>
                            <svg className={`icon icon-${selected ? 'checked' : 'unchecked'}`} aria-hidden="true">
                                <use xlinkHref={`#icon-${selected ? 'checked' : 'unchecked'}`}></use>
                            </svg>
                        </div>
                        <p className="item-content">
                            {item.content}
                            <svg className="icon icon-close" aria-hidden="true" onClick={() => this.delTodo(item.id)}>
                                <use xlinkHref="#icon-close"></use>
                            </svg>
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