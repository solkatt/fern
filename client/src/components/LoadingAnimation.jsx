import React, { Component } from "react";

class LoadingAnimation extends Component {
  render() {
  

    return (
      <div style={{ display: 'flex', height: '70%', width: '100%', alignItems: 'center', justifyContent: ' center'}}>
        {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
   
<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_j9byuw54.json"  background="transparent"  speed="1"  style={{width: '300px', height: '300px'}} loop  autoplay></lottie-player>
      </div>
    );
  }
}

export default LoadingAnimation;
