import React, { Component } from 'react';
import axios from 'axios';
import Graph from '../Graph/Graph';
import './Derivative.css';

class Derivative extends Component {
  constructor(props) {
    super(props);
    this.state = {
        overTime: [],
    };
  }
  render() {
    const { overTime } = this.state;
    return (
        <div>
            <Graph data={ overTime }/>
        </div>
    );
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const resp = await axios.get(`https://storage.googleapis.com/osbuddy-exchange/graphs/30/${ id }.json`);
    console.log(Object.values(resp.data));
    return this.setState({
        overTime: Object.values(resp.data),
     });
  }
}

export default Derivative;
