import React, { Component } from "react";
import Transaction from "../../components/content/Transaction";
import Header from "../../components/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTransactions } from "../../_actions/transaction";
import { dataSign } from "../../_actions/user";

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
    await this.props.getTransc();
  };

  render() {
    const { transactions } = this.props;
    const transac =
      transactions &&
      transactions.data &&
      transactions.data.length > 0 &&
      transactions.data.map((rec, idx) => {
        return <Transaction key={idx} transaction={rec} />;
      });
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent">
            <h3>
              <i className="fas fa-calendar"></i> History Transaction
            </h3>
            <div style={{ padding: 15 }}>
              {" "}
              {transactions && transactions.loading ? "" : transac}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    getTransc: () => dispatch(getTransactions("?search=history", "tenant")),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HistoryTransaction));
