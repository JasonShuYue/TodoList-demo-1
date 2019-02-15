import React, { Component } from 'react';

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

    onSubmit() {
        let {formData} = this.state;
        console.log(formData)
    }

    render() {
        let { selectedTab } = this.state;
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
                                        onSubmit={this.onSubmit.bind(this)}
                            />
                            :
                            <SignUpForm onDataChange={this.changeDataForm.bind(this)}
                                        onSubmit={this.onSubmit.bind(this)}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default UserDialog;