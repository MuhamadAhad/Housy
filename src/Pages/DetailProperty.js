import React, { Component } from "react";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";
import Loading from "../components/logo/Loading";
import { Button, Carousel } from "react-bootstrap";
import ModalBooking from "../components/modal/ModalBooking";
import { connect } from "react-redux";
import { getHouse } from "../_actions/house";
import { clickModalBooking } from "../_actions/modal";
import formatNumber from "../function/FormatNumber";
import { clickModalSignin } from "../_actions/modal";
import { dataSign } from "../_actions/user";
import ApprovalRent from "../components/modal/ApprovalRent";

class DetailProperty extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
  };

  componentDidMount = () => {
    this.props.gHouse(this.props.match.params.id);
  };

  render() {
    const dumImg =
      "https://hnsfpau.imgix.net/5/images/detailed/68/MonteCarlo-5S-Corner-Lounge-Suite.jpg?fit=fill&bg=0FFF&w=785&h=441&auto=format,compress";
    const { house, loading, sign } = this.props;
    const dummyImg = house.mainImg ? house.mainImg : dumImg;
    return (
      <>
        <ModalBooking />
        <ApprovalRent />
        <Header />
        <div className="content">
          <div className="mainContent">
            <div className="mainImgContainer">
              {loading ? (
                <Loading className="mainImage loadingSpinner" />
              ) : (
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 mainImage"
                      src={dummyImg}
                      alt="First slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                      <h3>{house.name}</h3>
                      <p>{house.address}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 mainImage"
                      src={dummyImg}
                      alt="second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 mainImage"
                      src={dummyImg}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              )}
            </div>
            <div className="secondImgContainer">
              {loading ? (
                <Loading className="secondImg loadingSpinner" />
              ) : (
                <img src={dummyImg} className="secondImg" alt="" />
              )}
              {loading ? (
                <Loading className="secondImg loadingSpinner" />
              ) : (
                <img src={dummyImg} className="secondImg" alt="" />
              )}
              {loading ? (
                <Loading className="secondImg loadingSpinner" />
              ) : (
                <img src={dummyImg} className="secondImg" alt="" />
              )}
            </div>
            <div style={{ padding: 10, marginTop: 10 }}>
              <div>
                <h1>{house.name}</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "70%",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ padding: 0 }}>
                    <h5>{`Rp.${
                      house.price === undefined
                        ? ""
                        : formatNumber(house.price.toString())
                    } / ${house.typeRent}`}</h5>
                  </div>
                  <div style={{ padding: 0 }}>
                    <small style={{ marginTop: 0 }} className="text-muted">
                      {house.address}
                    </small>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "30%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <small className="text-muted">Bedrooms</small>
                    </div>
                    {house && (
                      <div>
                        {house.bedRoom} <i className="fas fa-bed"></i>
                      </div>
                    )}
                  </div>
                  <div>
                    <div>
                      <small className="text-muted">Bathrooms</small>
                    </div>
                    {house && (
                      <div>
                        {house.bathRoom} <i className="fas fa-bath"></i>
                      </div>
                    )}
                  </div>
                  <div>
                    <div>
                      <small className="text-muted">Area</small>
                    </div>
                    <div>
                      {house.area && formatNumber(house.area.toString())} ft
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <h6>Description</h6>
                <small className="text-muted">{house.description}</small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginTop: 20,
                }}
              >
                {sign.level === "owner" ? (
                  ""
                ) : (
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.sign.signIn
                        ? this.props.modalBooking()
                        : this.props.modalSignin();
                    }}
                  >
                    <h5 style={{ margin: 0 }}>BOOK NOW</h5>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    house: state.house.data,
    loading: state.house.loading,
    sign: state.dataSign,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    gHouse: (idhouse) => dispatch(getHouse(idhouse)),
    modalBooking: () => dispatch(clickModalBooking()),
    modalSignin: () => dispatch(clickModalSignin()),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailProperty));
