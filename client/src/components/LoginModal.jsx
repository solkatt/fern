import React, { Component } from 'react';
import api from '../api'
import '../style/LoginModal.scss'
import '../style/Common.scss'

import { FaWindowClose} from 'react-icons/fa';



class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    onCloseModal = () => {
        this.props.onCloseModal()
    }

    onClickOutside = (event) => {
        const specifiedElement = document.querySelector('.login-modal')
          let isClickInside = specifiedElement.contains(event.target)
          if (!isClickInside) {
            this.onCloseModal()
        };
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        this.setState({
            [field]: value
        })

    }

    handleSubmit = async () => {
        // this.setState({ isLoading: true })

        const { email, password } = this.state;

        const payload = {
            email: email,
            password: password,
        }

        await api.loginUser(payload).then((res) => {

            localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            console.log(res.data);
        }, (err) => {
            console.log(err)
        })
    }

    inputValidation = () => {
        const { firstName, lastName } = this.state;

        if (firstName.length < 1) {
            alert('FYLL I NAMN!!')
        }
        if (lastName.length < 1) {
            alert('FYLL I EFTERNAMN')
        }
    }


    render() {
        return (
            <>
                <div className="modal" onClick={this.onClickOutside}>
                    <div className="login-modal">
                    <FaWindowClose className="close pointer" onClick={this.onCloseModal}/>
                        <h1>Login</h1>

                        <input name="email" type="email" placeholder="Email"  onChange={this.handleInputChange}></input>
                        <input name="password" type="password" placeholder="Lösenord"  onChange={this.handleInputChange}></input>
                        <button type="submit" onClick={this.handleSubmit}>Login</button>
                    </div>
                </div>
            </>
        )
    }
}

export default LoginModal