import React, { Component } from "react";
import Header from "../../components/Header";
import ApprovalRent from "../../components/modal/ApprovalRent";
import { dataSign } from "../../_actions/user";
import { connect } from "react-redux";
import { clickModalTransaction } from "../../_actions/modal";
import { getTransactions, getTransaction } from "../../_actions/transaction";
import { withRouter } from "react-router-dom";
import Loading from "../../components/logo/Loading";

class ListTransaction extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "owner") {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    this.props.getTransc();
  }

  stylingStatus(status) {
    if (status === "approved") {
      return (
        <small className="alert alert-success" style={{ padding: 5 }}>
          Approved
        </small>
      );
    } else if (status === "paid") {
      return (
        <small className="alert alert-warning" style={{ padding: 5 }}>
          Waiting approval
        </small>
      );
    } else if (status === "canceled") {
      return (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Canceled
        </small>
      );
    }
  }

  handleAction = (id) => {
    this.props.modalTransaction();
    this.props.getTrans(id);
  };

  render() {
    const { transactions, loading } = this.props;
    const list =
      transactions &&
      transactions.length > 0 &&
      transactions.map((ls, idx) => {
        return (
          <tr key={idx}>
            <td>{++idx}</td>
            <td>{ls.User.fullName}</td>
            <td>{ls.House.typeRent}</td>
            <td>{ls.attachment}</td>
            <td>{this.stylingStatus(ls.status)}</td>
            <td>
              <i
                className={`fas fa-search`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.handleAction(ls.id);
                }}
              ></i>
            </td>
          </tr>
        );
      });
    return (
      <>
        <Header />
        <ApprovalRent />
        <div className="content">
          <div className="mainContent mainShadow">
            <h3>
              <i className="fas fa-list"></i> Incoming Transaction
            </h3>
            <br />
            {loading ? (
              <Loading className="mainHomeImg spinnerHome" />
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Users</th>
                    <th>Type of rent</th>
                    <th>Transfer Proof</th>
                    <th>Status Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.modalTransaction,
    transactions: state.transactions.data,
    loading: state.transactions.loading,
    sign: state.dataSign,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    modalTransaction: () => dispatch(clickModalTransaction()),
    getTransc: () => dispatch(getTransactions(null, "owner")),
    getTrans: (id) => dispatch(getTransaction(id)),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListTransaction));
