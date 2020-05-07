import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { clickBathRoom, clickBedRoom } from "../../_actions/filter";
import { connect } from "react-redux";

class PropRoom extends Component {
  render() {
    const { clickBath, clickBed, filter } = this.props;
    const buttonBed = [];
    for (let i = 1; i < 5; i++) {
      buttonBed.push(
        <Button
          key={i}
          variant="outline-secondary"
          size="md"
          active={filter.bedRoom === i ? true : false}
          onClick={(e) => clickBed(i)}
          value={i}
        >
          {i}
        </Button>
      );
    }
    const buttonBath = [];
    for (let i = 1; i < 5; i++) {
      buttonBath.push(
        <Button
          key={i}
          variant="outline-secondary"
          size="md"
          active={filter.bathRoom === i ? true : false}
          onClick={(e) => clickBath(i)}
          value={i}
        >
          {i}
        </Button>
      );
    }
    return (
      <div className="comFilter">
        <h5>Property Room</h5>
        <div>
          <small className="text-muted">Bed Room</small>
        </div>
        <div className="filterButton" style={{ marginBottom: 10 }}>
          {buttonBed}
          <Button
            variant="outline-secondary"
            size="md"
            active={filter.bedRoom === 5 ? true : false}
            onClick={(e) => clickBed(parseInt(e.target.value))}
            value="5"
          >
            5+
          </Button>
        </div>
        <div>
          <small className="text-muted">Bath Room</small>
        </div>
        <div className="filterButton">
          {buttonBath}
          <Button
            variant="outline-secondary"
            size="md"
            active={filter.bathRoom === 5 ? true : false}
            onClick={(e) => {
              clickBath(parseInt(e.target.value));
            }}
            value="5"
          >
            5+
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
    clickBath: (value) => dispatch(clickBathRoom(value)),
    clickBed: (value) => dispatch(clickBedRoom(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropRoom);
