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
  {value: 'standartSlot', label: 'Легковое место '},
  {value: 'trackSlot', label: 'Грузовое место'},
  {value: 'invalidSlot', label: 'Инвалидное место'},
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
      getParkingStatus: () => {
        const { parking } = this.state;
        return Object.keys(parking).reduce((p,c) => ({
            trackSlotFree:    p.trackSlotFree + parking[c].freeSlots.trackSlot,
            invalidSlotFree:  p.invalidSlotFree + parking[c].freeSlots.invalidSlot,
            standartSlotFree: p.standartSlotFree + parking[c].freeSlots.standartSlot,
            totalSlotFree:    p.totalSlotFree + parking[c].freeSlots.totalSlot,
            trackSlotBusy:    p.trackSlotBusy + parking[c].busySlot.trackSlot,
            invalidSlotBusy:  p.invalidSlotBusy + parking[c].busySlot.invalidSlot,
            standartSlotBusy: p.standartSlotBusy + parking[c].busySlot.standartSlot,
            totalSlotBusy:    p.totalSlotBusy + parking[c].busySlot.totalSlot,
        }),{
          trackSlotFree:    0,
          invalidSlotFree:  0,
          standartSlotFree: 0,
          totalSlotFree:    0,
          trackSlotBusy:    0,
          invalidSlotBusy:  0,
          standartSlotBusy: 0,
          totalSlotBusy:    0,
        });
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
  toParking = () => {
    const { selected, parking } = this.state;
    const freeParking = parking[selected.parking].freeSlots;
    const busyParking = parking[selected.parking].busySlot;
    /**
     * not good but for first edition is well
     */
    const freeSlots = freeParking[selected.typeCar] - 1;
    const busySlot = busyParking[selected.typeCar] + 1;
    const totalSlotF = freeParking.totalSlot - 1;
    const totalSlotB = busyParking.totalSlot + 1;

    this.setState({
      parking: {
        ...parking,
        [selected.parking]: {
          ...parking[selected.parking],
          freeSlots: {
            ...freeParking,
            [selected.typeCar]: freeSlots,
            totalSlot: totalSlotF,
          },
          busySlot: {
            ...busyParking,
            [selected.typeCar]: busySlot,
            totalSlot: totalSlotB,
          }
        },

      }
    });
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
                    {
                      selected.typeCar &&
                        <Col>
                          <button
                          disabled={!parking[selected.parking].freeSlots[selected.typeCar]}
                          onClick={this.toParking} type="button">
                            Припарковать авто
                          </button>
                        </Col>
                    }
                    </Row>
              }

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
