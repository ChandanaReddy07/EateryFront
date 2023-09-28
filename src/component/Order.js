import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from "../helper/user";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

function Bill({ userId }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [tipPercentage, setTipPercentage] = useState(10);
  const { user, token } = isAuthenticated();
  const [billData, setBillData] = useState(null);

  useEffect(() => {

    if(user)
    axios
      .get(`https://eatery-syux.onrender.com/order/orders/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrderDetails(response.data);
        // console.log("ordersss",orderDetails.length)
      }).catch((error)=>{
        console.log("axios Error",error)
      })
  }, [userId, token]);

  const calculateSubtotal = () => {
    return orderDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTip = () => {
    return (calculateSubtotal() * (tipPercentage / 100)).toFixed(2);
  };

  const calculateTotal = () => {
    return (calculateSubtotal() + parseFloat(calculateTip())).toFixed(2);
  };

  const handleTipChange = (e) => {
    setTipPercentage(e.target.value);
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "https://eatery-syux.onrender.com/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: calculateTotal() });
      // console.log("dataaaaa", data);
      initPayment(data.data);

      const clearOrderUrl = `https://eatery-syux.onrender.com/payment/order/clear/${user._id}`;
      await axios.post(clearOrderUrl, {
        tipAmount: calculateSubtotal(),
        totalCost: calculateTotal(),
      });

      const newBillData = {
        orderDetails,
        tipPercentage,
        subtotal: calculateSubtotal(),
        tip: calculateTip(),
        total: calculateTotal(),
      };
      setBillData(newBillData);
      // window.location.href = "/bill";
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = async (data) => {
    const options = {
      key: process.env.KEY_ID,
      amount: calculateTotal(),
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://eatery-syux.onrender.com/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          // console.log(data);
          generatePDF(); // Generate the PDF when payment is successful
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your Bill", 10, 15);

    const tableData = orderDetails.map((item) => [
      item.quantity,
      item.itemName,
      `$Rs. {(item.price * item.quantity).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["Quantity", "Item Name", "Price"]],
      body: tableData,
      startY: 20,
    });

    const subtotal = calculateSubtotal();
    const tipAmount = calculateTip();
    const total = calculateTotal();

    doc.text(`Subtotal: $Rs. {subtotal}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Tip: $Rs. ${tipAmount}`, 10, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: $Rs. {total}`, 10, doc.autoTable.previous.finalY + 30);

    doc.save("bill.pdf");
  };

  return (
    <div className="containerbill">
    <div className="bill-container">
      {isAuthenticated() &&  orderDetails.length !== 0 ? (
        <>
          <h2>Your Bill</h2>
          <div className="order-details">
            {orderDetails.map((item, index) => (
              <div key={index} className="order-item">
                <span className="item-quantity">
                  {item.quantity} X {item.itemName}
                </span>
                <span className="item-price">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <hr />
          <div className="tip-input">
            <label htmlFor="tipPercentage">Tip Percentage:</label>
            <input
              type="number"
              id="tipPercentage"
              value={tipPercentage}
              onChange={handleTipChange}
            />
          </div>
          <hr />
          <div className="totals">
            <div className="order-item">
              <span className="item-quantity">Subtotal: </span>
              <span className="item-price">Rs. {calculateSubtotal()}</span>
            </div>
            <div className="order-item">
              <span className="item-quantity">Total: </span>
              <span className="item-price">Rs. {calculateTotal()}</span>
            </div>
          </div>
          <button className="button1" onClick={handlePayment}>Pay Now</button>
        </>
      ) : (
        <p>You haven't placed any orders yet.</p>
      )}
    </div></div>
  );
}

export default Bill;
