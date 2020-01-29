import React,{ Component } from 'react';
import axios from 'axios';
// import {TextboxEdit} from './component/textbox.jsx';
const path = 'http://localhost:3000';

function tableDeleteArray () {
    var deleteArray = [];
    var table = document.getElementById('bestBefore');
    var count = table.rows.length;
    
    for (var i = 0; i < count; i++) {
        var row = table.rows[i];
        var chbox = row.cells[0].getElementsByTagName('input');
        if (chbox[0].checked) {
            console.log('yes');
            deleteArray.push(chbox[0].getAttribute("name"));
            var p = chbox[0].parentNode.parentNode;
            p.parentNode.removeChild(p);
            count--;
            i--;
        }
    }
    console.log('deleteArray', deleteArray);
    return deleteArray;
}

function tableEdit () {
    var table = document.getElementById('bestBefore');
    var count = table.rows.length;
    var rowcount = 0;
    var rowlevel = 0;
    for (var i = 0; i < count; i++) {
        var row = table.rows[i];
        var chbox = row.cells[0].getElementsByTagName('input');
        // chbox.type == 'checkbox' && 
        if (chbox[0].checked) {
           rowcount ++;
           rowlevel = i;
           console.log('i', i);
        }
    }
    if (rowcount != 1) {
        console.error('should be click one checkbox');
        document.getElementsByClassName("error")[0].innerHTML = "click only one checkbox";
    }
    else {
        document.getElementsByClassName("error")[0].style.visibility = "hidden";
        var edit_id = table.rows[rowlevel].cells[0].getElementsByTagName('input')[0].getAttribute("name");
        console.log('edit_id', edit_id);
        return edit_id;
    }
}

// this.handleClickDelete = this.handleClickDelete.bind(this); 
class TableController extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {  ischecked: false,
            todos: []
        };
        this.loadData = this.loadData.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    loadData() {
        fetch(path + '/bestbefore/find')
            .then(res => res.json())
            .then((data) => {
                this.setState({todos:data, isfetching: true});
            });
    }
    handleClickDelete () {
        var array = tableDeleteArray();
        fetch(path + '/bestbefore/delete', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({array})
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error("Post Failed");
            }
                
        })
    }

    handleClickEdit () {
        if (tableEdit() != '') {
            var new_array = tableEdit();
            fetch(path + '/bestbefore/send_data', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({new_array})
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                else {
                    throw new Error("Post Failed");
                }       
            })
            console.log(this.props);
          this.props.history.push('/edit');
            
        }
    }

    componentDidMount() {
        this.loadData();
    } 

    render() {
        const { history } = this.props;
        var i = 1;
        var stateThis = this;
        var stateCheck = this.state.ischeckd;
        var styleColor = {
            color: 'red',
            visibility: 'visible'
        };
        var listItems = this.state.todos.map(function(item) {
            return (
                <tr key = {item._id}>
                    <td><input type = "checkbox" name = {item._id} value = {`bestbefore${i++}`}  /></td>
                    <td>{item.name}</td>
                </tr>
            )
        
        });
        return (
            <div>
                <table id = 'bestBefore'>
                    <tbody>{listItems}</tbody>
                </table>
                <input type = "button" value = "delete" onClick = {this.handleClickDelete}/>
                <div>
                    <input type = "button" value = "edit" onClick = {this.handleClickEdit} />
                </div>
                <div className = "error" style = {styleColor}>
                </div>
            </div>
        )
    }
}

export default TableController;

/* <thead>
      <tr>
      {
      this.headers.map(function(h) {
        return (
        <th key = {h.key}>{h.label}</th>
        )
      })
      }
      </tr>
    </thead> */