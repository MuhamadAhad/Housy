import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import TransactionPage from "../content/TransactionPage";
import { connect } from "react-redux";
import Loading from "../logo/Loading";
import { clickModalTransaction } from "../../_actions/modal";

class ApprovalRent extends Component {
  render() {
    const { modal, clickModal, loading } = this.props;
    return (
      <Modal
        show={modal}
        onHide={() => {
          clickModal();
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loading className="mainImage loadingSpinner" />
          ) : (
            <TransactionPage />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.modalTransaction,
    loading: state.transaction.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickModal: () => dispatch(clickModalTransaction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalRent);
