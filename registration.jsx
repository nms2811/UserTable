import React, { Component } from 'react';
import axios from 'axios';

const path = 'http://localhost:3000';

class TextboxCreate extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        var data = {
            name: document.getElementById("create_username").value
        }
        fetch(path + '/bestbefore/create', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Post Failed");
            }
                   
        })
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <form>
                    <input placeholder = "Enter Name" type="text" id="create_username" onChange={this.handleChange} />
                    <input type = "button" value = "submit" onClick={this.handleSubmit}/>
                </form>      
            </div>
        );
    }

}
                    {/* <label htmlFor="email">Enter your email</label>
                    <input id="email" name="email" type="email" />
                    <label htmlFor="birthdate">Enter your birth date</label>
                    <input id="birthdate" name="birthdate" type="text" /> */}
export default TextboxCreate;