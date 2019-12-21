import React from "react";
import "./Form.scss"

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            phone: null,
            confirmPassword: null,
            errors: {
                username: '',
                email: '',
                password: '',
                phone: '',
                confirmPassword: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        const validEmailRegex =
            RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const validPhoneRegex =
            RegExp(/^\+380\d{3}\d{2}\d{2}\d{2}$/i);

        switch (name) {
            case 'username':
                errors.username = value.length < 3 ? 'Username must be 3 characters long!' : '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
                errors.confirmPassword = (this.state.confirmPassword === value) ? '' : 'Passwords do not match!'
                break;
            case 'phone':
                errors.phone = validPhoneRegex.test(value) ? '' : 'Phone is not valid!';
                break;
            case 'confirmPassword':
                errors.confirmPassword = (this.state.password === value && value.length >= 8) ? '' : 'Passwords do not match!';
                break;
            default:
                break;
        }

        this.setState({
            errors,
            [name]: value
        });
    }

    handleSubmit = (event) => {
        const validateForm = (errors) => {
            let valid = true;
            Object.values(errors).forEach(
                (val) => val.length > 0 && (valid = false)
            );
            return valid;
        };

        event.preventDefault();
        if(validateForm(this.state.errors)) {
            alert('Valid Form')
        } else {
            alert('Invalid Form')
        }
    };

    render() {
        const {errors} = this.state;
        return (
            <div className="formWrapper">
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className="form-group">
                        <p className="text"><label htmlFor="username">Username</label></p>
                        <input
                            type="text"
                            className={errors.username ? "form-control error" : "form-control"}
                            name="username"
                            id="username"
                            //onChange={this.handleChange}
                        />
                        {errors.username.length > 0 &&
                        <p className='error'>{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <p className="text"><label htmlFor="email">Email address</label></p>
                        <input
                            type="email"
                            className={errors.email ? "form-control error" : "form-control"}
                            name="email"
                            id="email"
                            //onChange={this.handleChange}
                        />
                        {errors.email.length > 0 &&
                        <p className='error'>{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <p className="text"><label htmlFor="password">Password</label></p>
                        <input
                            type="password"
                            className={errors.password ? "form-control error" : "form-control"}
                            name="password"
                            id="password"
                            //onChange={this.handleChange}
                        />
                        {errors.password.length > 0 &&
                        <p className='error'>{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <p className="text"><label htmlFor="confirmPassword">Confirm Password</label></p>
                        <input
                            type="password"
                            className={errors.confirmPassword ? "form-control error" : "form-control"}
                            name="confirmPassword"
                            id="confirmPassword"
                            //onChange={this.handleChange}
                        />
                        {errors.confirmPassword.length > 0 &&
                        <p className='error'>{errors.confirmPassword}</p>}
                    </div>
                    <div className="form-group">
                        <p className="text"><label htmlFor="phone">Phone number</label></p>
                        <input
                            type="tel"
                            className={errors.phone ? "form-control error" : "form-control"}
                            name="phone"
                            id="phone"
                            //onChange={this.handleChange}
                        />
                        {errors.phone.length > 0 &&
                        <p className='error'>{errors.phone}</p>}
                    </div>
                    <button type="submit" className="submit" >
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}