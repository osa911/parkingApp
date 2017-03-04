import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

class HomePage extends Component {
  state = {
    parking:{
      a:{
        freeSlots: {
          trackSlot:    10,
          invalidSlot:  5,
          standartSlot: 15,
          totalSlot:    30,
        },
        disabledSlot:{
          trackSlot:    0,
          invalidSlot:  0,
          standartSlot: 0,
          totalSlot:    0,
        },
      },
      b:{
        freeSlots: {
          trackSlot:    10,
          invalidSlot:  5,
          standartSlot: 15,
          totalSlot:    30,
        },
        disabledSlot: {
          trackSlot:    0,
          invalidSlot:  0,
          standartSlot: 0,
          totalSlot:    0,
        },
      },
    },
  };
  
  render() {
    console.log('this.state', this.state);
    return (
      <Grid>
          <Row className="show-grid">
            <Col md={12}>

            </Col>
          </Row>
      </Grid>
    );
  }
}

export default HomePage;
