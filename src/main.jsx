import React from 'react'
import ReactDOM from 'react-dom/client'
import PaymentForm from './components/PaymentForm'
import DataViewer from './components/PaymentTable'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PaymentForm/>
    <DataViewer></DataViewer>
  </React.StrictMode>,
)
