import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ClassifierList from './ClassifierList'
import ClassifierDetail from './ClassifierDetail'
import { browserHistory, Router, Route } from 'react-router'
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/display/:api_key" component={ClassifierList}/>
      <Route path="/details/:api_key/:classifier_id" component={ClassifierDetail}/>
      <Route path="/" component={App}/>
    </Router>,
  document.getElementById('root')
);
