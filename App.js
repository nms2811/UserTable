import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TableController from './component/table.jsx';
import TextboxEdit from './component/textbox.jsx'

class App extends Component {
  render() {
    return(
      
        <div className="App">
        <Router>
          <div>
          <Switch>
            <Route exact path = "/" component = {TableController} />
            <Route path = "/edit" component = {TextboxEdit} />
            <Route path = "/create" component = {TextboxEdit} />
          </Switch>
          </div>
        </Router>
      </div>
    ); 
  }

}

export default App;
