import React, { useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../helper/user";

const MenuItemCard = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const { data } = props;
  const { user,token } = isAuthenticated();


  const openOrderDialog = () => {
    if (user) {
      // If the user is signed in, open the order dialog
      setIsOrderDialogOpen(true);
    } else {
      // If the user is not signed in, show the Login overlay
      setShowLoginOverlay(true);
    }
  };
  const handleCloseLoginOverlay = () => {
    setShowLoginOverlay(false);
  };
  
  const closeOrderDialog = () => {
    setIsOrderDialogOpen(false);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const confirmOrder = async () => {
    try {
      // Make a POST request to the backend API to place the order
      const response = await axios.post(
        `https://eatery-syux.onrender.com/order/place-order/${user._id}`,
        {
          itemName: data.name,
          price: data.price,
          quantity: quantity,
          // userId: "65110d648a251f76416aa1e6"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Handle the API response and any other logic as needed
      if (response.status === 200) {
        console.log(response.data.message);
        // You can update the order or perform other actions as needed
      } else {
        console.error("Failed to place order");
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle the error as needed
    } finally {
      closeOrderDialog(); // Close the order dialog after placing the order
    }
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={data.url} alt="Salad" />
      </div>
      <div className="card__info">
        <div className="car__info--title">
          <h3>{data ? data.name : ""}</h3>
          {/* <div className="card__info--price"> <p>${data ? data.price : ''}</p></div> */}
          <p>fried</p>
        </div>
        <div className="card__info--price">
          <p>${data ? data.price : ""}</p>
          <button className="btn btn-primary" onClick={openOrderDialog}>
            Order Now
          </button>
        </div>
      </div>


      {isOrderDialogOpen && (
        <div className="overlay">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Order</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeOrderDialog}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Quantity: </strong>
                  <button
                    className="btn btn-secondary"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </p>
                <p>
                  Do you want to order{" "}
                  <strong>
                    {quantity} {data ? data.name : ""}
                  </strong>{" "}
                  for a total of{" "}
                  <strong> Rs. {(quantity * data.price).toFixed(2)} ?</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeOrderDialog}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showLoginOverlay && (
      <div className="overlay">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login Required</h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseLoginOverlay}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>You must be signed in to place an order.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseLoginOverlay}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default MenuItemCard;
