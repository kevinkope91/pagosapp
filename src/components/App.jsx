import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PaymentTable from './PaymentTable';
import PaymentForm from './PaymentForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagos" element={<PaymentTable />} />
        <Route path="/nuevo-pago" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
