import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detailproperty/:id" component={DetailProperty} />
          <Route path="/detailprofile" component={DetailProfile} />

          <Route path="/bookingpayment" component={BookingPayment} />
          <Route path="/historypayment" component={HistoryPayment} />

          <Route path="/addproperty" component={AddProperty} />
          <Route path="/listtransaction" component={ListTransaction} />
          <Route path="/historytransaction" component={HistoryTransaction} />

          <Route exact path="*" component={() => "404 FILE NOT FOUND"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
