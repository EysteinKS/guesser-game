import React, {Component} from "react";
import WordListContainer from "../components/WordListContainer"
import { session } from "../firebase/index"
import "../css/home.css"
import AuthUserContext from "../AuthUserContext";
import {SignInForm} from "../components/SignIn"
import {SignUpLink} from "../components/SignUp.jsx"

const Home = () =>
  <div>
    <AuthUserContext.Consumer>
      { authUser => authUser
        ? <HomeAuth />
        : <HomeUnAuth/>
      }
      </AuthUserContext.Consumer>
  </div>


class HomeAuth extends Component {
    constructor(props){
        super(props)
    }

    render(){

        return(
            <section>
            
                <h1>Home</h1>
                <WordListContainer/>
            
            </section>
            
        )
    }
}

class HomeUnAuth extends Component {
    constructor(props){
        super(props)
    }

    render(){

        return(
            <section>
            <SignInForm/>
            <SignUpLink/>
                
            
            </section>
            
        )
    }
}
export default Home;