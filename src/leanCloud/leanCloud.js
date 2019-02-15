import AV from 'leancloud-storage';


var APP_ID = 'mQOGtDlcxXM9tJzjMOXV31ok-gzGzoHsz';
var APP_KEY = 'jbFTLad0MUEduMTU8ihF9ujC';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


export default AV;

export function signUp(email, userName, passWord, successFn, errorFn) {
    // console.log('email', email)
    // console.log('userName', userName)
    // console.log('passWord', passWord)

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
        console.log(user)
        successFn.call(null, user);
    }, function (error) {
        errorFn.call(null, error)
    });
}