import React, {Component} from "react";
import CreateWordContainer from "../components/CreateWordContainer"

class Create extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section>
                <h1>Create</h1>
                <CreateWordContainer/>
            </section>
        )
    }
}

export default Create;