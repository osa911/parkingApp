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

const optionsForTypeCars = [
  {value: 1, label: 'Легковое место '},
  {value: 2, label: 'Грузовое место'},
  {value: 3, label: 'Инвалидное место'},
]

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
        busySlot:{
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
        busySlot: {
          trackSlot:    0,
          invalidSlot:  0,
          standartSlot: 0,
          totalSlot:    0,
        },
      },
    },
    selected: {
      parking: '',
      typeCar: '',
    }
  };

  componentWillMount() {
    window.parking = {
      getFreeSlots: (nameOfParking) => {
        const { parking } = this.state;
        if (nameOfParking) {
          return Object.keys(parking).indexOf(nameOfParking) !== -1 ?
                  parking[nameOfParking].busySlots
                : { erorrs: '404'};
        } else {
          return Object.keys(parking).reduce((p,c) => ({
              trackSlot:    p.trackSlot + parking[c].freeSlots.trackSlot,
              invalidSlot:  p.invalidSlot + parking[c].freeSlots.invalidSlot,
              standartSlot: p.standartSlot + parking[c].freeSlots.standartSlot,
              totalSlot:    p.totalSlot + parking[c].freeSlots.totalSlot,
          }),{
            trackSlot:    0,
            invalidSlot:  0,
            standartSlot: 0,
            totalSlot:    0,
          });
        }
      },
      getBusySlots: (nameOfParking) => {
        const { parking } = this.state;
        if (nameOfParking) {
          return Object.keys(parking).indexOf(nameOfParking) !== -1 ?
                  parking[nameOfParking].busySlots
                : { erorrs: '404'};
        } else {
          return Object.keys(parking).reduce((p,c) => ({
              trackSlot:    p.trackSlot + parking[c].busySlot.trackSlot,
              invalidSlot:  p.invalidSlot + parking[c].busySlot.invalidSlot,
              standartSlot: p.standartSlot + parking[c].busySlot.standartSlot,
              totalSlot:    p.totalSlot + parking[c].busySlot.totalSlot,
          }),{
            trackSlot:    0,
            invalidSlot:  0,
            standartSlot: 0,
            totalSlot:    0,
          });
        }
      },
    }
  }
  select = key => e => {
    this.setState({
      selected: {
        ...this.state.selected,
        [key]: e.target.value,
      },
    })
  }



  render() {
    console.log('this.state', this.state);
    const { parking, selected } = this.state;
    const optionsForParking = Object.keys(parking).map(i => ({ value: i, label: `Парковка ${i.toUpperCase()}`}))

    return (
      <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <Row className="show-grid">
                <Col md={6}>
                  <Select
                    placeholder="Выбирите парковку"
                    options={optionsForParking}
                    value={selected.parking}
                    onChange={this.select('parking')}
                  />
                </Col>
                {
                  selected.parking &&
                    <Col md={4}>
                      <InfoRow
                        label="Всего вободных месте: &nbsp;"
                        value={parking[selected.parking].freeSlots.totalSlot}
                      />
                      <InfoRow
                        label="Для грузовиков: &nbsp;"
                        value={parking[selected.parking].freeSlots.trackSlot}
                      />
                      <InfoRow
                        label="Инвалидных мест: &nbsp;"
                        value={parking[selected.parking].freeSlots.invalidSlot}
                      />
                      <InfoRow
                        label="Для легковых авто: &nbsp;"
                        value={parking[selected.parking].freeSlots.standartSlot}
                      />
                    </Col>
                }

              </Row>
              {
                selected.parking &&
                  <Row className="show-grid">
                    <Col md={6}>
                      <h4> Припарковать авто на парковке {selected.parking.toUpperCase()} </h4>
                      <Select
                        placeholder="Выбирите тип места"
                        options={optionsForTypeCars}
                        value={selected.typeCar}
                        onChange={this.select('typeCar')}
                      />
                    </Col>
                  </Row>
              }

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
