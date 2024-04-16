import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import PaymentForm from './PaymentForm'
import PaymentTable from './PaymentTable'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pagos" component={PaymentTable} />
        <Route path="/nuevo-pago" component={PaymentForm} />
      </Switch>
    </Router>
  );
};

export default App;
