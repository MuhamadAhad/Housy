import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { pickAmenities } from "../../_actions/filter";

class Amenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    const data = { ...this.props.amenities, [e.target.name]: e.target.checked };
    this.props.pickAmenities(data);
  };

  render() {
    const { amenities } = this.props;
    return (
      <div className="comFilter">
        <h5>Amenities</h5>
        <small
          className="text-muted"
          style={{ display: "flex", flexDirection: "column", fontSize: "70%" }}
        >
          <div>
            Furnished
            <Form.Check
              type="checkbox"
              name="furnished"
              style={{ float: "right" }}
              onChange={this.handleChange}
              checked={amenities.furnished}
            />
          </div>
          <div>
            Pet Allowed
            <Form.Check
              type="checkbox"
              name="pet"
              style={{ float: "right" }}
              onChange={this.handleChange}
              checked={amenities.pet}
            />
          </div>
          <div>
            Shared Accommodation
            <Form.Check
              type="checkbox"
              name="shared"
              style={{ float: "right" }}
              onChange={this.handleChange}
              checked={amenities.shared}
            />
          </div>
        </small>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    amenities: state.filter.amenities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pickAmenities: (data) => dispatch(pickAmenities(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Amenities);
