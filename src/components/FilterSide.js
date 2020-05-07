import React, { Component } from "react";
import TypeRent from "./filter/TypeRent";
import DatePick from "./filter/DatePick";
import PropRoom from "./filter/PropRoom";
import Budget from "./filter/Budget";
import Amenities from "./filter/Amenities";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { clickApply } from "../_actions/filter";

class FilterSide extends Component {
  render() {
    const { handleApply } = this.props;
    return (
      <div>
        <TypeRent />
        <DatePick />
        <PropRoom />
        <Amenities />
        <Budget />
        <div>
          <Button
            variant="outline-secondary"
            style={{ float: "right" }}
            onClick={() => {
              handleApply();
            }}
          >
            APPLY
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleApply: () => dispatch(clickApply()),
  };
};

export default connect(null, mapDispatchToProps)(FilterSide);
