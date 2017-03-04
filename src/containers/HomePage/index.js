import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {
  Grid,
  Row,
  Col,
  Label,
} from 'react-bootstrap';

import Select from '../../components/Select';
import InfoRow from '../../components/InfoRow';

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
    selectedParking: '',
  };
  selectParking = e => {
    this.setState({
      selectedParking: e.target.value,
    })
  }
  render() {
    console.log('this.state', this.state);
    const { parking, selectedParking } = this.state;
    const options = Object.keys(parking).map(i => ({ value: i, label: `Парковка ${i.toUpperCase()}`}))
    return (
      <Grid>
          <Row className="show-grid">
            <Col md={12}>
            <Row className="show-grid">
              <Col md={6}>
                <Select
                  placeholder="Выбирите парковку"
                  options={options}
                  value={selectedParking}
                  onChange={this.selectParking}
                />
              </Col>
              {
                selectedParking &&
                  <Col md={4}>
                    <InfoRow
                      label="Всего вободных месте: &nbsp;"
                      value={parking[selectedParking].freeSlots.totalSlot}
                    />
                    <InfoRow
                      label="Для грузовиков: &nbsp;"
                      value={parking[selectedParking].freeSlots.trackSlot}
                    />
                    <InfoRow
                      label="Инвалидных мест: &nbsp;"
                      value={parking[selectedParking].freeSlots.invalidSlot}
                    />
                    <InfoRow
                      label="Для легковых авто: &nbsp;"
                      value={parking[selectedParking].freeSlots.standartSlot}
                    />
                  </Col>
              }

            </Row>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
