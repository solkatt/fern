import React from "react";
// import { Redirect } from "react-router-dom";
import api from '../api'

import {
  getFromStorage,
  setInStorage,
  removeFromStorage,
} from "../utils/storage";

const UserContext = React.createContext();

export class UserProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      id: '',
      isLoggedIn: false,
      isAdmin: false,
      isLoading: true,
      //   token: "",
      redirect: false,

      //   onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      //   getAllProducts: this.getAllProducts,
      //   displayAllProducts: this.displayAllProducts,
      //   setUsername: this.setUsername,
      getUserData: this.getUserData,
      renderRedirect: this.renderRedirect,
      setRedirect: this.setRedirect,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage("storage-object");
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token)


      //   const { firstName, email, password } = this.state;

      const payload = {
        params: {

        },
        headers: {
          "x-auth-token": token,
          "content-type": "application/json"
        }
      }



      await api.getCurrentUser(payload)
        .then((res) => {
          if (res.data) {
            const { name, _id, isAdmin, email } = res.data

            this.setState({
              username: name,
              id: _id,
              isAdmin: isAdmin,
              email: email,
              isLoading: false,
              isLoggedIn: true,
            })
          } else {
            this.setState({
              isLoading: false,
            })
          }
        }, (err) => {
          console.log(err)
          this.setState({
            isLoading: false,
          })
        })

    }

  };

  //   setUsername = (username) => {
  //     this.setState({
  //       username: username,
  //     });
  //   };

  //   onSignIn = (username, password) => {

  //     this.setState({
  //       isLoading: true,
  //     });

  //     fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json.token) {
  //           setInStorage("storage-object", { token: json.token });

  //           this.getUserData();
  //         } else {
  //           alert(json.message);
  //         }
  //       })
  //       .catch();
  //   };

  onSignOut = () => {
    this.setState({
      isLoading: true,
    });

    const obj = getFromStorage("storage-object");
    if (obj && obj.token) {

      removeFromStorage("storage-object", {
        token: obj.token,
      });
      this.setState({
        isLoading: false,
        isLoggedIn: false,
        isAdmin: false,
      });
      // this.setRedirect();

    } else {
      this.setState({
        isLoading: false,
      });
    }
  };


  // setRedirect = () => {
  //   this.setState({
  //     redirect: true,
  //   });
  // };

  // renderRedirect = () => {
  //   console.log(this.state.redirect)
  //   if (this.state.redirect || !this.state.isAdmin) {
  //     console.log('RenderRedirect fired')

  //     return <Redirect to="/" />;
  //   }
  // };

  render() {


    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;
export const Consumer = UserContext.Consumer;