import React, {Component} from "react";
import CreateWordContainer from "../components/CreateWordContainer"
import SessionContainer from "../components/SessionContainer"

import "../css/Create.css"
class Create extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section>
                <h1>Create</h1>
                <CreateWordContainer/>
                <SessionContainer/>
            </section>
        )
    }
}

export default Create;