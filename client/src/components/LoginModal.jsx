import React, { Component } from 'react';
import '../style/LoginModal.scss'
import '../style/Common.scss'

import { FaWindowClose} from 'react-icons/fa';





class JoinModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);

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





// onCloseJoin(){
//     const joinModal = document.querySelector('.modal');
//     joinModal.classList.add('hide')
//     console.log('click')
// }

    render() {
        return (
            <>
                <div className="modal" onClick={this.onClickOutside}>
                    <div className="join-modal">
                    <FaWindowClose className="close pointer" onClick={this.onCloseModal}/>
                        <h1>Join</h1>
                        <input type="text" placeholder="Förnamn"></input>
                        <input type="text" placeholder="Efternamn"></input>
                        <input type="text" placeholder="Mail"></input>
                        <input type="text" placeholder="Telefon"></input>
                        <input type="text" placeholder="Adress"></input>
                        <input type="text" placeholder="Butik"></input>
                        <button>Join</button>
                    </div>
                </div>
            </>
        )
    }
}

export default JoinModal