import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DetailProperty from "./Pages/DetailProperty";
import DetailProfile from "./Pages/DetailProfile";
import BookingPayment from "./Pages/tenant/BookingPayment";
import HistoryPayment from "./Pages/tenant/HistoryPayment";
import AddProperty from "./Pages/owner/AddProperty";
import ListTransaction from "./Pages/owner/ListTransaction";
import HistoryTransaction from "./Pages/owner/HistoryTransaction";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/detailproperty/:id" component={DetailProperty} />
        <Route exact path="/detailprofile" component={DetailProfile} />

        <Route exact path="/bookingpayment" component={BookingPayment} />
        <Route exact path="/historypayment" component={HistoryPayment} />

        <Route exact path="/addproperty" component={AddProperty} />
        <Route exact path="/listtransaction" component={ListTransaction} />
        <Route
          exact
          path="/historytransaction"
          component={HistoryTransaction}
        />

        <Route exact path="*" component={() => "404 FILE NOT FOUND"} />
      </Router>
    );
  }
}

export default App;
