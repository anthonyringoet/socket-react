import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:4001'
    }
  }
  componentDidMount () {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('info', data => this.setState({ response: data }));
  }
  render () {
    const { response } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        {response
          ? <Stats cpu={response.cpu} uptime={response.uptime} />
          : <p>Loading...</p>}
      </div>
    )
  }
}

class Stats extends Component {
  render() {
    const {cpu, uptime} = this.props
    return (
      <div>
        <section>
          <h2>Uptime</h2>
          {uptime}
        </section>
        <section>
          <h2>CPU user</h2>
          {cpu.user}
          <h2>CPU system</h2>
          {cpu.system}
        </section>
      </div>
    )
  }
}

export default App
