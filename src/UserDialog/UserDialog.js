import React, { Component } from 'react';

import {signUp, signIn} from "../leanCloud/leanCloud";

import './UserDialog.css';
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'signUp',
            formData: {
                username: '',
                password: '',
                email: ''
            },
            error: ''
        };
    }

    changeTab(e) {
        let value = e.target.attributes['value'].textContent;
        this.setState({
            ...this.state,
            selectedTab: value
        });
    }

    changeDataForm(value, type) {
        let {formData} = this.state;
        formData[type] = value;
        this.setState({
            ...this.state,
            formData
        })
    }


    // 注册/登录操作
    signUpOrIn() {
        let { changeUser } = this.props;
        let { formData: {email, username, password}, selectedTab} = this.state;
        let success = (user)=>{
            changeUser.call(null, user);
        }
        let error = (error)=>{
            let temp = '';
            switch(error.code) {
                case 125:
                    temp = "电子邮箱地址无效";
                    break;
                case 200:
                    temp = "用户名或者用户名为空";
                    break;
                case 201:
                    temp = "请填写密码";
                    break;
                case 202:
                    temp = "用户名已经被占用";
                    break;
                case 210:
                    temp = "用户名和密码不匹配";
                    break;
                case 219:
                    temp = "登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码";
                    break;
                default:
                    temp = error.rawMessage;
            };
            console.log('1111111', error)
            this.setState({
                ...this.state,
                error: temp
            });
        }
        if(selectedTab === "signUp") {
            signUp(email, username, password, success, error)
        }
        if(selectedTab === "signIn") {
            signIn(username, password, success, error)
        }
    }

    render() {
        let { selectedTab, error } = this.state;
        return(
            <div className="UserDialog-wrapper">
                <div className="UserDialog">
                    <ul className="tab-list">
                       <li className={`tab-item ${selectedTab === 'signUp' ? 'active' : ''}`} value={'signUp'} onClick={this.changeTab.bind(this)}>Sign Up</li>
                       <li className={`tab-item ${selectedTab === 'signIn' ? 'active' : ''}`} value={'signIn'} onClick={this.changeTab.bind(this)}>Sign In</li>
                    </ul>
                    {
                        selectedTab === "signIn" ?
                            <SignInForm onDataChange={this.changeDataForm.bind(this)}
                                        onSubmit={this.signUpOrIn.bind(this)}
                                        error={error}
                            />
                            :
                            <SignUpForm onDataChange={this.changeDataForm.bind(this)}
                                        onSubmit={this.signUpOrIn.bind(this)}
                                        error={error}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default UserDialog;