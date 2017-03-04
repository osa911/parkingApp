import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Row className="show-grid">
          <Col xs={12} md={12}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
