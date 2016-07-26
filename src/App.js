import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

let keys_data_string = window.localStorage.getItem('vision_api_keys') || "[]";

let persistKeys = function(keys_data) {
  window.localStorage.setItem('vision_api_keys', JSON.stringify(keys_data));
};

class App extends Component {
  constructor() {
    super();
    this.state = { saved_keys: JSON.parse(keys_data_string)};
  }
  onSubmit(e) {
    e.preventDefault();
    let new_keys = this.state.saved_keys;
    new_keys.push(e.target.firstChild.value);
    e.target.firstChild.value = '';
    this.setState({ saved_keys: new_keys});
    persistKeys(new_keys);
    return false;
  }
  onClick(index) {
    let new_keys = this.state.saved_keys;
    new_keys.splice(index,1);
    this.setState({saved_keys: new_keys});
    persistKeys(new_keys);
    return false;
  }
  render() {
    const ul_style = {
      listStyleType: 'none'
    };

    const li_style = {};

    let self = this;

    return (
      <div className="App">
        <div className="App-header">
          <h1><Link className="App-homelink" to="/">Vision Demo Admin Helper</Link></h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" name="api_key" placeholder="API Key"/>
            <input type="submit" name="Use"/>
            <input type="reset" name="Clear"/>
          </form>
        </div>
        <ul style={ul_style}>
          {this.state.saved_keys.map(function(item,index) {
            return (<li key={index} style={li_style}>
              <Link to={`/display/${item}`}>{item}</Link>
              <button onClick={self.onClick.bind(self,index)}>Delete</button>
            </li>);
          })}
        </ul>
      </div>
    );
  }
}

export default App;
