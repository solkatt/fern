
import React, { Component } from 'react'

import { GiPlantRoots } from 'react-icons/gi';

import { Link } from 'react-router-dom'



class Logo extends Component {
    render() {
        return (
          <div style={{fontSize: '1.7rem'}}>
              {/* <h3>Logo</h3> */}

              <Link to="/" className="nav-link">
                  
              <GiPlantRoots  />
                </Link>
          </div>
        )
    }
}

export default Logo