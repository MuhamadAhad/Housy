import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { clickTypeRent } from "../../_actions/filter";
import { connect } from "react-redux";

class TypeRent extends Component {
  render() {
    const { filter, clickType } = this.props;

    return (
      <div className="comFilter">
        <h5>Type of Rent</h5>
        <div className="filterButton">
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              clickType(parseInt(e.target.value));
            }}
            active={filter.typeRent === 1 ? true : false}
            value="1"
          >
            Day
          </Button>
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              clickType(parseInt(e.target.value));
            }}
            active={filter.typeRent === 2 ? true : false}
            value="2"
          >
            Month
          </Button>
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              clickType(parseInt(e.target.value));
            }}
            active={filter.typeRent === 3 ? true : false}
            value="3"
          >
            Year
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickType: (value) => dispatch(clickTypeRent(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeRent);
