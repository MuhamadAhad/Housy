import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { changePrice } from "../../_actions/filter";
import { connect } from "react-redux";
class Budget extends Component {
  formatNumber = (num) => {
    const numb = num.replace(/[^,\d]/g, "").toString();
    const split = numb.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
  };

  render() {
    const { onChangePrice } = this.props;
    return (
      <div className="comFilter">
        <h5>Budget</h5>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <small>Less than</small>
            </InputGroup.Text>
            <InputGroup.Text>
              <small>IDR</small>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            style={{ textAlign: "right" }}
            type="text"
            name="budget"
            placeholder="Price.."
            onChange={(e) => {
              onChangePrice(e.target.value);
              if (parseInt(e.target.value[0]) === 0) {
                e.target.value = "";
              } else {
                e.target.value = this.formatNumber(e.target.value);
              }
            }}
          />
        </InputGroup>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePrice: (value) => dispatch(changePrice(value)),
  };
};

export default connect(null, mapDispatchToProps)(Budget);
