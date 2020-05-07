import React, { Component } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { clickModalBooking } from "../../_actions/modal";
import {
  dateNow,
  dateByMonth,
  dateByYear,
  countDay,
  haveValue,
  countByYear,
  countByMonth,
} from "../../function/CountDate";
import { clickModalTransaction } from "../../_actions/modal";
import FormatDate from "../../function/FormatDate";
import { createTransaction } from "../../_actions/transaction";
import formatNumber from "../../function/FormatNumber";

class ModalBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: "",
      checkOut: "",
      message: "",
      year: "",
      month: "",
      total: "",
      detailCheckout: "",
      detailCheckin: "",
      day: "",
    };
  }

  setEmptyState = () => {
    this.setState({
      checkIn: "",
      checkOut: "",
      message: "",
      year: "",
      month: "",
      total: "",
      detailCheckout: "",
      detailCheckin: "",
      day: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { house } = this.props;
    const { checkOut, checkIn, year, total, month, day } = this.state;
    const now = dateNow();
    if (
      house.typeRent === "year" &&
      haveValue(checkOut) &&
      haveValue(checkIn) &&
      haveValue(year) &&
      haveValue(total) &&
      checkIn < checkOut &&
      checkIn >= now
    ) {
      const years = countByYear(checkIn, checkOut);
      const totals = years * house.price;
      const cYear = parseInt(year);
      if (totals === total && cYear === years) {
        const date = new Date();
        const attachment = `${this.props.sign.userName}-${
          house.id
        }-${date.getTime()}.jpg`;
        const data = {
          checkIn,
          checkOut,
          total,
          attachment,
          HouseId: house.id,
          status: "booked",
        };
        await this.props.createTransc(data);
        this.setEmptyState();
        this.props.modalTransaction();
        this.props.clickBooking();
      } else {
        this.setState({ message: "data cannot to process" });
      }
    } else if (
      house.typeRent === "month" &&
      haveValue(checkOut) &&
      haveValue(checkIn) &&
      haveValue(month) &&
      haveValue(total) &&
      checkIn < checkOut &&
      checkIn >= now
    ) {
      const months = countByMonth(checkIn, checkOut);
      const totals = months * house.price;
      const cMonth = parseInt(month);
      if (totals === total && cMonth === months) {
        const date = new Date();
        const attachment = `${this.props.sign.userName}-${
          house.id
        }-${date.getTime()}.jpg`;
        const data = {
          checkIn,
          checkOut,
          total,
          attachment,
          HouseId: house.id,
          status: "booked",
        };
        await this.props.createTransc(data);
        this.setEmptyState();
        this.props.modalTransaction();
        this.props.clickBooking();
      } else {
        this.setState({ message: "data can't continue to process" });
      }
    } else if (
      house.typeRent === "day" &&
      haveValue(checkOut) &&
      haveValue(checkIn) &&
      haveValue(day) &&
      haveValue(total) &&
      checkIn < checkOut &&
      checkIn >= now
    ) {
      const days = countDay(checkIn, checkOut);
      const totals = days * house.price;
      const cDay = parseInt(day);
      if (totals === total && cDay === days) {
        const date = new Date();
        const attachment = `${this.props.sign.userName}-${
          house.id
        }-${date.getTime()}.jpg`;
        const data = {
          checkIn,
          checkOut,
          total,
          attachment,
          HouseId: house.id,
          status: "booked",
        };
        await this.props.createTransc(data);
        this.setEmptyState();
        this.props.modalTransaction();
        this.props.clickBooking();
      } else {
        this.setState({ message: "data can't continue to process" });
      }
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value }, () => {
      const { house } = this.props;
      const now = dateNow();
      if (
        house.typeRent === "year" &&
        haveValue(this.state.checkIn) &&
        haveValue(this.state.year)
      ) {
        const checkOut = dateByYear(
          this.state.checkIn,
          parseInt(this.state.year)
        );
        this.setState({ checkOut }, () => {
          this.setState(
            {
              detailCheckout: FormatDate.convertDate(this.state.checkOut),
              detailCheckin: FormatDate.convertDate(this.state.checkIn),
            },
            () => {
              const years = parseInt(this.state.year);
              this.setState({ total: years * house.price }, () => {});
            }
          );
        });
      } else if (
        house.typeRent === "month" &&
        haveValue(this.state.checkIn) &&
        haveValue(this.state.month)
      ) {
        const checkOut = dateByMonth(
          this.state.checkIn,
          parseInt(this.state.month)
        );
        this.setState({ checkOut }, () => {
          this.setState(
            {
              detailCheckout: FormatDate.convertDate(this.state.checkOut),
              detailCheckin: FormatDate.convertDate(this.state.checkIn),
            },
            () => {
              const months = parseInt(this.state.month);
              this.setState({ total: months * house.price }, () => {});
            }
          );
        });
      } else if (
        house.typeRent === "day" &&
        haveValue(this.state.checkIn) &&
        haveValue(this.state.checkOut) &&
        this.state.checkIn < this.state.checkOut &&
        this.state.checkIn >= now
      ) {
        const days = countDay(this.state.checkIn, this.state.checkOut);
        this.setState({ day: days }, () => {
          this.setState(
            {
              detailCheckout: FormatDate.convertDate(this.state.checkOut),
              detailCheckin: FormatDate.convertDate(this.state.checkIn),
            },
            () => {
              this.setState({ total: this.state.day * house.price }, () => {});
            }
          );
        });
      }
    });
  };

  render() {
    const now = dateNow();
    const { modalBooking, clickBooking, house } = this.props;
    let form = "";
    if (house.typeRent === "year") {
      form = (
        <Form.Group>
          <Form.Label>How many years you will stay ?</Form.Label>
          <Form.Control
            type="number"
            placeholder="how many years..."
            required
            max={10}
            min={1}
            name="year"
            onChange={this.handleChange}
            value={this.state.year}
          />
        </Form.Group>
      );
    } else if (house.typeRent === "month") {
      form = (
        <Form.Group>
          <Form.Label>How many months you will stay ?</Form.Label>
          <Form.Control
            type="number"
            placeholder="How many months..."
            required
            max={120}
            min={1}
            name="month"
            onChange={this.handleChange}
            value={this.state.month}
          />
        </Form.Group>
      );
    } else {
      form = (
        <Form.Group>
          <Form.Label>Check-out</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date Check-out"
            required
            min={this.state.checkIn}
            name="checkOut"
            onChange={this.handleChange}
            value={this.state.checkOut}
          />
        </Form.Group>
      );
    }
    return (
      <Modal
        show={modalBooking}
        onHide={() => {
          clickBooking();
        }}
        centered
      >
        <Modal.Body>
          <h3 style={{ textAlign: "center" }}>how long you will stay</h3>
          <Form onSubmit={this.handleSubmit}>
            {this.state.message && (
              <Alert variant="danger" style={{ padding: 3 }}>
                <small>{this.state.message}</small>
              </Alert>
            )}
            <Form.Group>
              <Form.Label>Check-in</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date Check-in"
                min={now}
                required
                name="checkIn"
                onChange={this.handleChange}
                value={this.state.checkIn}
              />
            </Form.Group>
            {form}
            <h6 style={{ textAlign: "center" }}>
              {`${this.state.detailCheckin} ${
                haveValue(this.state.detailCheckin) ? "until" : ""
              } ${this.state.detailCheckout}`}
            </h6>
            <br />
            <h6 style={{ textAlign: "center" }}>
              {this.state.total &&
                this.state.total !== 0 &&
                `Total price : Rp.${formatNumber(this.state.total.toString())}`}
            </h6>
            <Button variant="secondary" type="submit" block>
              Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalBooking: state.modal.modalBooking,
    house: state.house.data,
    sign: state.dataSign,
  };
};
const mapDispatchToState = (dispatch) => {
  return {
    clickBooking: () => dispatch(clickModalBooking()),
    createTransc: (data) => dispatch(createTransaction(data)),
    modalTransaction: () => dispatch(clickModalTransaction()),
  };
};
export default connect(mapStateToProps, mapDispatchToState)(ModalBooking);
