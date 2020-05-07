import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FormatDate from "../../function/FormatDate";
import formatNumber from "../../function/FormatNumber";
import { clickModalTransaction } from "../../_actions/modal";
import { connect } from "react-redux";
import { getTransaction } from "../../_actions/transaction";
import { countDay, countByYear, countByMonth } from "../../function/CountDate";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getButton(val) {
    let result = "";
    if (val === "booked") {
      result = (
        <div
          style={{
            display: "flex",
            width: "23%",
            marginRight: 20,
          }}
        >
          <Button
            block
            onClick={(e) => {
              this.handleAction(this.props.transaction.id);
            }}
          >
            <strong>PAY</strong>
          </Button>
        </div>
      );
    } else if (val === "approved") {
      result = "";
    } else {
      result = "";
    }
    return result;
  }
  getAlert(val) {
    let result = "";
    if (val === "booked") {
      result = (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Waiting Payment
        </small>
      );
    } else if (val === "approved") {
      result = (
        <small className="alert alert-success" style={{ padding: 5 }}>
          Approved
        </small>
      );
    } else if (val === "paid") {
      result = (
        <small className="alert alert-warning" style={{ padding: 5 }}>
          Waiting approve
        </small>
      );
    } else if (val === "canceled") {
      result = (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Canceled
        </small>
      );
    }
    return result;
  }

  getTitle(val) {
    let result = "";
    if (val === "booked") {
      result = "BOOKING";
    } else if (val === "approved") {
      result = "INVOICE";
    } else if (val === "paid") {
      result = "PAID";
    } else {
      result = "";
    }
    return result;
  }

  getPicture(val) {
    let result = "";
    if (val === "booked") {
      result = (
        <img
          src={require("../../images/Struk.png")}
          className="imagePayment"
          alt=""
          width="100%"
          height="150px"
          onClick={this.props.handleUpload}
        />
      );
    } else if (val === "approved") {
      result = (
        <img
          src={require("../../images/Barcode.png")}
          alt=""
          width="100%"
          height="150px"
        />
      );
    } else if (val === "waiting") {
      result = (
        <img
          src={require("../../images/Struk.png")}
          className="imagePayment"
          alt=""
          width="100%"
          height="150px"
        />
      );
    } else {
      result = (
        <img
          src={require("../../images/Struk.png")}
          className="imagePayment"
          alt=""
          width="100%"
          height="150px"
        />
      );
    }
    return result;
  }

  getTextPicture(val) {
    let result = "";
    if (val === "booked") {
      result = (
        <>
          <input
            type="file"
            className="paymentProof"
            style={{ display: "none" }}
          />
          <small
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={this.props.handleUpload}
          >
            Upload Payment Proof
          </small>
        </>
      );
    } else if (val === "approved") {
      result = "";
    } else if (val === "paid") {
      result = (
        <small className="text-muted" style={{ cursor: "pointer" }}>
          Upload Payment Proof
        </small>
      );
    } else {
      result = (
        <small className="text-muted" style={{ cursor: "pointer" }}>
          Upload Payment Proof
        </small>
      );
    }
    return result;
  }

  getColorTotal(val, price) {
    const total = formatNumber(price);
    let result = "";
    if (val === "booked") {
      result = <strong style={{ color: "red" }}>{total}</strong>;
    } else if (val === "approved") {
      result = <strong style={{ color: "green" }}>{total}</strong>;
    } else if (val === "paid") {
      result = <strong style={{ color: "red" }}>{total}</strong>;
    } else {
      result = <strong style={{ color: "red" }}>{total}</strong>;
    }
    return result;
  }

  handleAction = (id) => {
    this.props.modalTransaction();
    this.props.getTrans(id);
  };

  getDuration = (typeRent, checkin, checkout) => {
    if (typeRent === "years") {
      const result = countByYear(checkin, checkout);
      return result;
    } else if (typeRent === "month") {
      const result = countByMonth(checkin, checkout);
      return result;
    } else if (typeRent === "day") {
      const result = countDay(checkin, checkout);
      return result;
    }
  };

  render() {
    const { transaction } = this.props;
    const resultYear =
      transaction && transaction.House && transaction.House.typeRent === "year"
        ? countByYear(transaction.checkIn, transaction.checkOut)
        : "";
    const resultMonth =
      transaction && transaction.House && transaction.House.typeRent === "month"
        ? countByMonth(transaction.checkIn, transaction.checkOut)
        : "";
    const resultDay =
      transaction && transaction.House && transaction.House.typeRent === "day"
        ? countDay(transaction.checkIn, transaction.checkOut)
        : "";
    const date = new Date(transaction && transaction.createdAt);
    const checkIn = FormatDate.convertDate(transaction && transaction.checkIn);
    const checkOut = FormatDate.convertDate(
      transaction && transaction.checkOut
    );
    const newDate = (
      <>
        <strong>{FormatDate.getDayName(date.getDay())}</strong>
        {`, ${date.getDate()} ${FormatDate.getMonthName(
          date.getMonth()
        )} ${date.getFullYear()}`}
      </>
    );
    return (
      <div className="transactionShadow">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
            }}
          >
            <div>
              <img
                src={require("../logo/logo.png")}
                width="120"
                height="60"
                className="d-inline-block align-top"
                alt="Housy logo"
              />
            </div>
            <div>
              <h3>
                {transaction && transaction.House && transaction.House.name}
              </h3>
            </div>
            <div>
              <small>
                <p>
                  {transaction &&
                    transaction.House &&
                    transaction.House.address}
                  <br />
                  {transaction &&
                    transaction.House &&
                    transaction.House.City.name}
                </p>
              </small>
            </div>
            <div>{this.getAlert(transaction && transaction.status)}</div>
          </div>
          <div style={{ display: "flex", width: "22%", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "30%",
                alignItems: "center",
              }}
            >
              <div>
                <i className="fas fa-dot-circle"></i>
              </div>
              <div className="verticalLine"></div>
              <div>
                <i className="fas fa-circle"></i>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <div>
                <h6 style={{ marginBottom: 0 }}>Check-in</h6>
                <small className="text-muted">{checkIn}</small>
              </div>
              <div style={{ height: 30 }}></div>
              <div style={{ marginTop: 20 }}>
                <h6 style={{ marginBottom: 0 }}>Check-out</h6>
                <small className="text-muted">{checkOut}</small>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "22%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 91 }}>
                <h6 style={{ marginBottom: 0 }}>Amenities</h6>
                {transaction &&
                  transaction.House &&
                  transaction.House.amenities.map((rec, idx) => {
                    return (
                      <div key={idx}>
                        <small className="text-muted">{rec}</small>
                      </div>
                    );
                  })}
              </div>
              <div style={{ marginTop: 20 }}>
                <h6 style={{ marginBottom: 0 }}>Type of Rent</h6>
                <small className="text-muted">
                  {transaction &&
                    transaction.House &&
                    transaction.House.typeRent.toUpperCase()}
                </small>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "26%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <h1>{this.getTitle(transaction && transaction.status)}</h1>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5 className="text-muted">{newDate}</h5>
            </div>
            <div>{this.getPicture(transaction && transaction.status)}</div>
            <div style={{ height: 30 }}>
              {this.getTextPicture(transaction && transaction.status)}
            </div>
          </div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted">1</td>
                <td className="text-muted">
                  {transaction && transaction.User && transaction.User.fullName}
                </td>
                <td className="text-muted">
                  {transaction && transaction.User && transaction.User.gender}
                </td>
                <td className="text-muted">
                  {transaction && transaction.User && transaction.User.phone}
                </td>

                <td style={{ textAlign: "right" }}>
                  <strong>Long time rent</strong>
                </td>
                <td>
                  <strong>
                    :{` ${resultYear}${resultMonth}${resultDay}`}{" "}
                    {transaction &&
                      transaction.House &&
                      transaction.House.typeRent}
                  </strong>
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "right" }}>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>: </strong>
                  {transaction &&
                    transaction.total &&
                    this.getColorTotal(
                      transaction.status,
                      transaction.total.toString()
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {this.getButton(transaction && transaction.status)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalTransaction: () => dispatch(clickModalTransaction()),
    getTrans: (id) => dispatch(getTransaction(id)),
  };
};

export default connect(null, mapDispatchToProps)(Transaction);
