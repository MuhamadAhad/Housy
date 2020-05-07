import React, { Component } from "react";
import Header from "../../components/Header";
import Loader from "react-loader-spinner";
import { Form, Button, InputGroup } from "react-bootstrap";
import { dataSign } from "../../_actions/user";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formatNumber from "../../function/FormatNumber";
import { getCities } from "../../_actions/city";
import { createHouse } from "../../_actions/house";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
    this.state = {
      name: "",
      CityId: "",
      typeRent: "",
      address: "",
      price: "",
      amenities: {
        furnished: false,
        petAllowed: false,
        shared: false,
      },
      bedRoom: "",
      bathRoom: "",
      area: "",
      mainImg: "",
      description: "",
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "owner") {
      this.props.history.push("/");
    }
  };

  handleChange = (e) => {
    const { type, name, checked, value } = e.target;
    type === "checkbox"
      ? this.setState({
          amenities: { ...this.state.amenities, [name]: checked },
        })
      : this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      CityId,
      typeRent,
      address,
      price,
      bedRoom,
      bathRoom,
      area,
      mainImg,
      description,
    } = this.state;
    if (
      name !== "" &&
      CityId !== "" &&
      typeRent !== "" &&
      address !== "" &&
      price !== "" &&
      bedRoom !== "" &&
      bathRoom !== "" &&
      area !== "" &&
      mainImg !== "" &&
      description !== ""
    ) {
      let amenities = [];
      for (let key in this.state.amenities) {
        let name = "";
        switch (key) {
          case "furnished":
            name = "Furnished";
            break;
          case "petAllowed":
            name = "Pet Allowed";
            break;
          case "shared":
            name = "Shared Accommodation";
            break;
          default:
            break;
        }
        if (this.state.amenities[key] === true) {
          amenities.push(name);
        }
      }
      const data = {
        name,
        CityId,
        typeRent,
        address,
        price: parseFloat(price.split(".").join("").replace(/,/, ".")),
        bedRoom,
        bathRoom,
        area: parseInt(area.split(".").join("").replace(/,/, ".")),
        mainImg,
        description,
        amenities,
      };
      await this.props.createHouse(data);
      this.props.history.push(`/detailproperty/${this.props.house.data.id}`);
    }
  };
  render() {
    const { cities } = this.props;
    const city =
      cities.data &&
      cities.data.length > 0 &&
      cities.data.map((rec, idx) => {
        return (
          <option key={idx} value={rec.id}>
            {rec.name}
          </option>
        );
      });
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent mainShadow">
            <h3>
              <i className="fas fa-home"></i> Add Property
            </h3>
            <div
              style={{
                padding: 15,
              }}
            >
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Name Property</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name New Property"
                    required
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    value={this.state.CityId}
                    required
                    name="CityId"
                  >
                    <option value="">Choose City</option>
                    {city}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Enter address of property"
                    value={this.state.address}
                    onChange={this.handleChange}
                    required
                    name="address"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type of Rent</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    value={this.state.typeRent}
                    name="typeRent"
                  >
                    <option value="">Please select type of rent</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="day">Day</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>IDR</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name="price"
                      placeholder="Enter price for rent"
                      value={this.state.price}
                      onChange={(e) => {
                        if (parseInt(e.target.value[0]) === 0) {
                          e.target.value = "";
                        } else {
                          e.target.value = formatNumber(e.target.value);
                          this.setState({ price: e.target.value });
                        }
                      }}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Amenities</Form.Label>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <Form.Check
                      inline
                      label="Furnished"
                      type="checkbox"
                      name="furnished"
                      onChange={this.handleChange}
                      checked={this.state.amenities.furnished}
                    />
                    <Form.Check
                      inline
                      label="Pet Allowed"
                      type="checkbox"
                      name="petAllowed"
                      onChange={this.handleChange}
                      checked={this.state.amenities.petAllowed}
                    />
                    <Form.Check
                      inline
                      label="Shared Accommodation"
                      type="checkbox"
                      name="shared"
                      checked={this.state.amenities.shared}
                      onChange={this.handleChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bedroom</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="bedRoom"
                    onChange={this.handleChange}
                    value={this.state.bedRoom}
                  >
                    <option value="">How many bedrooms </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5+</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bathroom</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="bathRoom"
                    onChange={this.handleChange}
                    value={this.state.bathRoom}
                  >
                    <option value="">How many bathrooms</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5+</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Area</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="area"
                      placeholder="how much area..."
                      value={this.state.area}
                      onChange={(e) => {
                        if (parseInt(e.target.value[0]) === 0) {
                          e.target.value = "";
                        } else {
                          e.target.value = formatNumber(e.target.value);
                          this.setState({ area: e.target.value });
                        }
                      }}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>ft</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Image URL : </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name="mainImg"
                      placeholder="please put url for image property"
                      value={this.state.mainImg}
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    name="description"
                    placeholder="Enter description about this property"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    style={{ width: "26%" }}
                    type="submit"
                    variant="secondary"
                  >
                    {this.props.house.loading ? (
                      <Loader
                        type="Circles"
                        color="white"
                        width={20}
                        height={15}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </Form>
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
    cities: state.cities,
    house: state.house,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    getCities: () => dispatch(getCities()),
    createHouse: (data) => dispatch(createHouse(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProperty));
