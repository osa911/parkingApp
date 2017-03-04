import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import { Col, Label } from 'react-bootstrap';

class InfoRow extends Component {
  static propTypes = {
    md:          PropTypes.number,
    label:       PropTypes.string,
    value:       PropTypes.number,
  }

  static defaultProps = {
    md: 6,
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
