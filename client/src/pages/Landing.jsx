import React, { Component } from 'react'
import '../style/Landing.scss'

import FunctionalComp from '../components/FunctionalComp'

class Landing extends Component {




    render() {
        return (
            <div className="landing-page">
                <div className="fern-intro">
                    <h1>FERN</h1>
                    <h2>Set up an online store easy as duck</h2>
                    <h2>or explore stores and buy shit</h2>
                    <h3>Store with CMS & Payment solutions and a bunch of other bonkers stuff </h3>
                    <h3> Do as {513} fern stores and join now..</h3>

                    <button className="cta-join">JOIN</button>
                </div>


                <div className="fern-animation">
                    <div className='animation'>


                    <script
                        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
                    </script><lottie-player src="https://assets7.lottiefiles.com/packages/lf20_aitf3mii.json" background="transparent" speed="1" className='animation' loop autoplay></lottie-player>

                            </div>



                </div>



                {/* <FunctionalComp /> */}

            </div>
        )
    }
}

export default Landing