import React , {Component} from 'react' ; 
import Emptable from './components/emptable'
import './App.css';
import CreateEmployeeComponent from './components/CreateEmployeeComponent'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' ;
import updateEmployeeComponent from './components/updateEmployeeComponent'
import viewEmployeeComponent from './components/viewemployeecomponent'
class App extends Component {

  render(){
    return (
      <div className="App">
          <Router>
        <h1>Employee List</h1>
        <Switch> 
        <Route path = "/" exact component = {Emptable}></Route>
        <Route path = "/add-employee/" component = {CreateEmployeeComponent}></Route>
        <Route path = "/update-employee/:id" component = {CreateEmployeeComponent}></Route>
        <Route path="/view-employee/:id" component={viewEmployeeComponent}></Route>
        </Switch> 
        </Router>
      </div>
    );
  }
 
}

export default App;
