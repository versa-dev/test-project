import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [detail, setDetail] = useState([])

  const clickItem = (order_id) => {
    setShowDetail(true)
    setDetail(data.filter((item) => (item.order_id === order_id))[0])
  }

  const clickReturn = () => {
    setShowDetail(false)
  }

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:3000/orders",
      headers: { 
        'Content-Type': 'application/json'
      },
    }
    axios(config)
      .then((res) => {
        console.log(res.data.length, '-')
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(showDetail, '++=')
  if (!showDetail) {
    return (
      <div className="App">
        <div className="items-title">Live Order</div>
        {
          data.length > 0 && 
          <div className="orders">
            {data.map((item, index) => {
              return <div key={`${index}`} className="order-item" onClick={() => clickItem(item.order_id)}>
                <div className="left-column">
                  <div style={{display:"flex"}}>
                    <div className="picked">{item.is_pickup ? 'PickUp' : 'Delivery'}</div>
                    <div className="order-id">{item.order_id}</div>
                  </div>
                  <div className="order-info">{(new Date(item.order_time)).toLocaleTimeString()} for { item.customer.name }</div>
                  <div className="total-amount">{item.order_total_amount}$</div>
                </div>
                <div className="right-column">
                  <div className="paid">{item.is_paid ? 'Paid' : 'Cash'}</div>
                </div>
              </div>
            })}
          </div>
        }
      </div>
    );
  } else {
    console.log(detail)
    return (
      <div className="detail">
        <button onClick={clickReturn}>{`<< Return`}</button>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <div className="picked">{detail.is_pickup ? 'PickUp' : 'Delivery'}</div>
          <div className="paid paid-detail">{detail.is_paid ? 'Paid' : 'Cash'}</div>
        </div>
        <div className="order-number"> Order-ID : {`${detail.order_id}`}</div>
        <div className="order-time">{Date(detail.order_time)}</div>
        <div className="customer-name">Customer : {detail.customer.name}</div>
        <div className="order-total">Order-Total : {detail.order_total_amount}$</div>
    <div className="sales_tax_pct">Sales-Tax : {detail.sales_tax_pct}</div>
      </div>
    );
  }
}

export default App;
