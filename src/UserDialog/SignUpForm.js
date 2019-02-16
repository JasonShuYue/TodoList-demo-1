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

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        let { error } = this.props;
        return(
            <div className="SignUpForm">
                <form className="signUp-form" onSubmit={(e) => this.onSubmit(e)}>
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
                    {
                        error && <p className="tips">{error}</p>
                    }
                    <button className="signUp-button">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpForm;