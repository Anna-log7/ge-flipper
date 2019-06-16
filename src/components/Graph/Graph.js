import React, { Component } from 'react';
import v from 'victory';

class Derivative extends Component {
  constructor(props) {
    super(props);
    this.state = {
        options: {},
    };
  }
  render() {
    const { options } = this.state;
    return (
        <div>
        </div>
    );
  }
  async componentDidMount() {
    const { data } = this.props.match.params;
    console.log(data);
    const options = {
    }
    return this.setState({
        options: options,
     });
  }
}

export default Derivative;
