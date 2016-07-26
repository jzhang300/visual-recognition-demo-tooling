import React, { Component } from 'react';
import './ClassifierDetail.css';
import jquery from 'jquery';
import moment from 'moment';

class ClassifierDetailRow extends Component {
  render() {
    return (<div key={this.props.classifier_id} className="CDR-Detail">
      <div className="CDR-Name">Name: {this.props.name}</div>
      <div className="CDR-ID">ID: {this.props.classifier_id}</div>
      <div className="CDR-Owner">Owner: {this.props.owner}</div>
      <div className="CDR-Created">Created: {this.props.created}</div>
      <div className={`CDR-Status ${this.props.status}`}>Status: {this.props.status}</div>
      <h3>Classes</h3>
      <ul className="CDR-Classes">
      {this.props.subclasses.map(function(item) {
        return (<li className="CDR-Class" key={item.class}>{item.class}</li>);
      })}
      </ul>
    </div>)
  }
}

class ClassifierDetail extends Component {
  constructor() {
    super();
    this.state = { payload: {}};
  }
  componentDidMount() {
    let url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers/'+this.props.params.classifier_id;
    let params = {api_key: this.props.params.api_key, version: "2016-05-19"};
    console.log('started fetch');
    this.serverRequest = jquery.ajax({url: url, contentType: 'multipart/form-data', type: 'GET', data: params }).done(function (result) {
      console.log('got results');
      let parsed_result = JSON.parse(result);
      this.setState({
        payload: parsed_result,
        created_at: moment(parsed_result.created).format('MM-DD-YYYY')
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    let pre_style={ display: 'none'};
    return (<div>
      {this.state.payload ? <pre style={pre_style}>
      {JSON.stringify(this.state.payload,null,2)}
        </pre> : <pre>Nope</pre>}
      {this.state.payload.classes ?
          <ClassifierDetailRow status={this.state.payload.status} subclasses={this.state.payload.classes} name={this.state.payload.name} classifier_id={this.state.payload.classifier_id} owner={this.state.payload.owner} created={this.state.created_at}/> : ''}
    </div>);
  }
}

export default ClassifierDetail;