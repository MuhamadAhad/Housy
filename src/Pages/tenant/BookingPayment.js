import React, { Component } from "react";
import Transaction from "../../components/content/Transaction";
import Header from "../../components/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTransactions } from "../../_actions/transaction";
import { dataSign } from "../../_actions/user";
import ApprovalRent from "../../components/modal/ApprovalRent";

class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "tenant") {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    this.props.getTransc();
  }

  render() {
    const { transactions, loading } = this.props;
    const transac =
      transactions &&
      transactions.length > 0 &&
      transactions.map((rec, idx) => {
        return <Transaction key={idx} transaction={rec} />;
      });
    return (
      <>
        <Header />
        <ApprovalRent />
        <div className="content">
          <div className="mainContent">
            <h3>
              <i className="fas fa-calendar"></i> Booking List
            </h3>
            <div style={{ padding: 15 }}>{loading ? "" : transac}</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
    transactions: state.transactions.data,
    loading: state.transactions.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    getTransc: () => dispatch(getTransactions("?search=booking", "tenant")),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HistoryTransaction));
