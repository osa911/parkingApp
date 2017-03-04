import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import { Col, Label } from 'react-bootstrap';

class InfoRow extends Component {
  static propTypes = {
    label:       PropTypes.string,
    value:       PropTypes.number,
  }

  static defaultProps = {
    label: '',
    value: ''
  }

  render() {
    const { md, label, value } = this.props;
    return (
        <h4>{label}
          <Label>
            {value}
          </Label>
        </h4>
    );
  }
}

export default InfoRow;
