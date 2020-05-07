import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import FilterSide from "../components/FilterSide";
import CardProperty from "../components/card/CardProperty";
import { connect } from "react-redux";
import { getHouses } from "../_actions/house";
import Loading from "../components/logo/Loading";
import { withRouter } from "react-router-dom";
import { dataSign } from "../_actions/user";

class Home extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn === true && this.props.sign.level === "owner") {
      this.props.history.push("/listtransaction");
    }
  };

  componentDidMount() {
    this.props.getHouses();
  }

  formatPrice = (num) => {
    const newNum = num.split(".").join("");
    return newNum;
  };

  render() {
    const { houses } = this.props;
    return (
      <>
        <Header />
        <Row className="homeContent">
          <Col sm={3} className="filterSide">
            <FilterSide />
          </Col>
          <Col sm={9} className="homeMainContent">
            <div className="mainHomeContent">
              {houses && houses.loading ? (
                <Loading className="mainHomeImg spinnerHome" />
              ) : (
                houses.data &&
                houses.data.length > 0 &&
                houses.data.map((rec, idx) => (
                  <CardProperty data={rec} key={idx} />
                ))
              )}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses,
    sign: state.dataSign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHouses: () => dispatch(getHouses()),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
