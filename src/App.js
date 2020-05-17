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
          <Route exact path="/" children={Home} />
          <Route exact path="/detailproperty/:id" children={DetailProperty} />
          <Route exact path="/detailprofile" children={DetailProfile} />

          <Route exact path="/bookingpayment" children={BookingPayment} />
          <Route exact path="/historypayment" children={HistoryPayment} />

          <Route exact path="/addproperty" children={AddProperty} />
          <Route exact path="/listtransaction" children={ListTransaction} />
          <Route
            exact
            path="/historytransaction"
            children={HistoryTransaction}
          />

          <Route exact path="*" children={() => "404 FILE NOT FOUND"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
