import AV from 'leancloud-storage';


var APP_ID = 'mQOGtDlcxXM9tJzjMOXV31ok-gzGzoHsz';
var APP_KEY = 'jbFTLad0MUEduMTU8ihF9ujC';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


export default AV;

export function signUp(email, userName, passWord, successFn, errorFn) {
    // 新建AVUser实例
    let user = new AV.User();

    // 设置用户名
    user.setUsername(userName);

    // 设置密码
    user.setPassword(passWord);

    // 设置邮箱
    user.setEmail(email);

    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined
};

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

// 读取上次登录的用户
export function getCurrentUser() {
    let user = AV.User.current();
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

// 登出操作
export function signOut() {
    AV.User.logOut()
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loggedInUser) {
        let user = getUserFromAVUser(loggedInUser);
        successFn.call(null, user);
    }, function (error) {
        errorFn.call(null, error)
    });
}

// 新增Todo
export function addTodo(obj, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo');
    let todo = new Todo();

    for(let key in obj) {
        todo.set(key, obj[key]);
    }
    todo.save().then((todo)=> {
        todo = getUserFromAVUser(todo);
        successFn(todo);
    }, (error) => {
        errorFn(error);
    });
}

export function delTodo(id, successFn, errorFn) {
    var todo = AV.Object.createWithoutData('Todo', id);
    todo.destroy().then(function (success) {
        // 删除成功
        success = getUserFromAVUser(success);
        successFn(success);
    }, function (error) {
        // 删除失败
        errorFn(error)
    });
}

// 批量删除Todo
export function batchDelTodo(idList, successFn, errorFn) {
    let objects = [];
    idList.map( v => {
        objects.push(AV.Object.createWithoutData('Todo', v));
    });
    // 批量删除
    AV.Object.destroyAll(objects).then(function () {
        // 成功
        successFn();
    }, function (error) {
        // 异常处理
        errorFn(error);
    });
}

export function batchUpdateTodos(idList, type, successFn, errorFn) {
    let objects = [];
    idList.map( v => {
        let todo = AV.Object.createWithoutData('Todo', v);
        todo.set('status', type)
        objects.push(todo);
    });

    // 批量创建（更新）
    AV.Object.saveAll(objects).then(function (objects) {
        successFn();
    }, function (error) {
        // 异常处理
        errorFn(error)
    });
}

export function updateTodoItem(obj, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo', obj.id);
    todo.set('content', obj.content);
    todo.save().then((success)=> {
        successFn(success);
    }, (error) => {
        errorFn(error)
    });
}

// 获取对应userId的TodoList
export function fetchAllTodos(userId, successFn, errorFn) {
    var query = new AV.Query('Todo');
    query.find().then(function (todos) {
        // 先过滤出对应userId的TodoList
        let filterList = [];
        for(let i = 0; i < todos.length; i++) {
            let current = getUserFromAVUser(todos[i]);
            if(current.userId === userId) {
                filterList.push(current);
            }
        }
        return AV.Object.saveAll(filterList);
    }).then(function(todos) {
        // 更新成功
        successFn(todos)
    }, function (error) {
        // 异常处理
        errorFn(error);
    });
}