import React, { Component } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { dataSign } from "../../_actions/user";
import { connect } from "react-redux";

class DropdownNavbar extends Component {
  constructor(props) {
    super(props);
    props.dataSign();
    this.state = {};
  }

  handleSignout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.dataSign();
    this.props.history.push("/");
  };

  render() {
    const secondMenu =
      this.props.sign.level === "tenant" ? (
        <>
          <Dropdown.Item as={Link} to="/bookingpayment">
            <i className="fas fa-calendar"></i> My Booking
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/historypayment">
            <i className="fas fa-list-alt"></i> History
          </Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item as={Link} to="/addproperty">
            <i className="fas fa-home"></i> Add Property
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/historytransaction">
            <i className="fas fa-list-alt"></i> History
          </Dropdown.Item>
        </>
      );
    return (
      <Dropdown drop="left">
        <Dropdown.Toggle
          as={Image}
          src={require(`../../images/khabib_nurmagomedov.jpg`)}
          alt="avatar"
          width="50px"
          height="50px"
          className="avatar"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/detailprofile">
            <i className="fas fa-user"></i> Profile
          </Dropdown.Item>

          {secondMenu}
          <hr style={{ margin: 0 }} />
          <Dropdown.Item as="button" onClick={this.handleSignout}>
            <i className="fas fa-power-off"></i> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DropdownNavbar));
