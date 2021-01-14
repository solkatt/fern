import React, { Component } from 'react';
import '../style/JoinModal.scss'
import '../style/Common.scss'

import { FaWindowClose } from 'react-icons/fa';
import api from '../api'





class JoinModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            adress: '',
            city: '',
            zip: '',
            phone: 0,
            store: '',
            password: '',
        }

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    onCloseModal = () => {
        this.props.onCloseModal()
    }


    onClickOutside = (event) => {
        const specifiedElement = document.querySelector('.join-modal')
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

        const { firstName, email, password } = this.state;

        const payload = {
            name: firstName,
            email: email,
            password: password,
        }

        await api.registerUser(payload).then((res) => {
            console.log(res);

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
                    <div className="join-modal">
                        <FaWindowClose className="close pointer" onClick={this.onCloseModal} />
                        <h1>Join</h1>
                        <input name="firstName" type="text" placeholder="Förnamn" onChange={this.handleInputChange}></input>
                        <input name="lastName" type="text" placeholder="Efternamn" onChange={this.handleInputChange}></input>
                        <input name="email" type="email" placeholder="Email" onChange={this.handleInputChange}></input>
                        {/* <input name="phone" type="text" placeholder="Telefon" onChange={this.handleInputChange}></input>
                        <input name="adress" type="text" placeholder="Address" onChange={this.handleInputChange}></input>
                        <input name="city" type="text" placeholder="City" onChange={this.handleInputChange}></input>
                        <input name="zip" type="text" placeholder="Zip" onChange={this.handleInputChange}></input>
                        <input name="store" type="text" placeholder="Butik" onChange={this.handleInputChange}></input> */}
                        <input name="password" type="password" placeholder="password" onChange={this.handleInputChange}></input> */}

                        <button type="submit" onClick={this.handleSubmit}>Join</button>
                    </div>
                </div>
            </>
        )
    }
}

export default JoinModal