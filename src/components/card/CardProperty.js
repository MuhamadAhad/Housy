import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardProperty extends Component {
  formatNumber = (num) => {
    return Intl.NumberFormat("de-DE").format(num);
  };

  render() {
    const {
      amenities,
      id,
      typeRent,
      address,
      price,
      bedRoom,
      bathRoom,
      area,
      mainImg,
    } = this.props.data;
    const labels = amenities.map((rec, idx) => {
      return (
        <small key={idx} className="labelImg">
          {rec}
        </small>
      );
    });
    return (
      <div className="cardContainer">
        <div className="cardPro">
          <Link to={`/detailproperty/${id}`}>
            <div>
              <img src={mainImg} className="imageCard" alt="" />
            </div>
          </Link>
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            {labels}
          </div>
          <div style={{ marginLeft: 3 }}>
            <div style={{ marginTop: 3 }}>
              <strong>{`Rp. ${this.formatNumber(price)} / ${typeRent}`}</strong>
            </div>
            <div>
              <small>{`${bedRoom} Beds, ${bathRoom} Baths, ${this.formatNumber(
                area
              )} sqft`}</small>
              <br />
            </div>
            <div>
              <small className="text-muted">{address}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardProperty;
