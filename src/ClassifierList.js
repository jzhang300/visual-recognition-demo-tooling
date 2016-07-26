import React, { Component } from 'react';
import { Link } from 'react-router';
import './ClassifierList.css';
import jquery from 'jquery';

class ClassifierShortDetail extends Component {
  render() {
    return (<Link className="LSD-detaillink" to={`/details/${this.props.api_key}/${this.props.classifier_id}`}>
      <div className="List-Shortdetail">
        <div className="LSD-name">{this.props.name}</div>
        <div className="LSD-classifier_id">{this.props.classifier_id}</div>
        <div className="LSD-status">{this.props.status}</div>
      </div>
    </Link>);
  }
}

class ClassifierList extends Component {
  constructor() {
    super();
    this.state = { classifiers: [], error: null};
  }

  componentDidMount() {
    let url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers';
    let params = {api_key: this.props.params.api_key, version: "2016-05-19"};
    console.log('started fetch');
    this.serverRequest = jquery.get(url, params).done(function (result) {
      let parsed_result = JSON.parse(result);
      let new_classifiers = parsed_result.classifiers || [];
      console.log("found ",new_classifiers.length," new classifiers");
      this.setState({
        classifiers: new_classifiers
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    let self = this;
    return (<div className="ListBody">
      <div className="List-header">
        <h1>{this.props.params.api_key}</h1>
      </div>
      <ul className="ListList">
        {this.state.classifiers.map(function(item) {
          return (<li key={item.classifier_id}><ClassifierShortDetail api_key={self.props.params.api_key} name={item.name} classifier_id={item.classifier_id} status={item.status}/></li>);
        })}
      </ul>
    </div>);
  }
}

export default ClassifierList;
