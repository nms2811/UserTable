import React, { Component } from 'react';
import axios from 'axios';

const path = 'http://localhost:3000';

class TextboxEdit extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            editArray: [],
            value: ''
        };
        this.loadData = this.loadData.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        var data = {
            _id: document.getElementById("username").name,
            name: document.getElementById("username").value,
        }
        fetch(path + '/bestbefore/edit_data', {
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

    loadData() {
        fetch(path + '/bestbefore/get_data')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({editArray: data, value: data[0].name});
            });
    }

    componentDidMount() {
        this.loadData();
    }
    //  defaultvalue = {this.state.editArray[0].name}
    // onSubmit={this.handleSubmit}
    // value = {this.state.editArray[0].name}
    render() {
        var stateThis = this;
        var listItems = this.state.editArray.map(function(user) {

            if (user) {
                return (
                    <div key = {user._id}>
                    <form>
                        <input placeholder = "Enter Name" type="text" id="username" name = {user._id} value = {stateThis.state.value} onChange={stateThis.handleChange} />
                        <input type = "button" value = "submit" onClick={stateThis.handleSubmit}/>
                    </form>    
                    </div>
                );
            }
           
        
        });
        
        return (
            <div>
               {listItems}    
            </div>
        );
    }

}
                    {/* <label htmlFor="email">Enter your email</label>
                    <input id="email" name="email" type="email" />
                    <label htmlFor="birthdate">Enter your birth date</label>
                    <input id="birthdate" name="birthdate" type="text" /> */}
export default TextboxEdit;