import React, { Component } from 'react';

import './SignUpForm.css';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onDataChange(e, type) {
        let {onDataChange} = this.props;
        let value = e.target.value;
        onDataChange(value, type)
    }

    render() {
        return(
            <div className="SignUpForm">
                <div className="input-wrapper">
                    <svg className="icon icon-email" aria-hidden="true">
                        <use xlinkHref={`#icon-email`}></use>
                    </svg>
                    <input type="text" placeholder={'Email'} onChange={(e) => this.onDataChange(e, 'email')}/>
                </div>

                <div className="input-wrapper">
                    <svg className="icon icon-user" aria-hidden="true">
                        <use xlinkHref={`#icon-user`}></use>
                    </svg>
                    <input type="text" placeholder={'Username'} onChange={(e) => this.onDataChange(e, 'username')} />
                </div>

                <div className="input-wrapper">
                    <svg className="icon icon-password" aria-hidden="true">
                        <use xlinkHref={`#icon-password`}></use>
                    </svg>
                    <input type="password" placeholder={'Password'} onChange={(e) => this.onDataChange(e, 'password')} />
                </div>
                <button className="signup-button">Sign Up</button>
            </div>
        );
    }
}

export default SignUpForm;