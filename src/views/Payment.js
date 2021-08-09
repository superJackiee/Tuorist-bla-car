import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { selectThemeColors } from "@utils";
import { useHistory } from "react-router-dom";
const Payment = () => {
  const history = useHistory();
  console.log(history.location.state);

  return (
    <div className="payment">
      <h2 className="mt-2">Checkout</h2>
      <div className="container-lg wrapper">
        <h4 className="pl-3">Select payment method</h4>
        <div className="mt-3 d-flex flex-row justify-content-between">
          <div className="d-flex flex-column payment-section">
            <div className="d-flex flex-row">
              <div className="mr-3">
                <Button color="#FFFFFF" className="credit-card px-3 py-1">
                  Credit card
                </Button>
              </div>
              <div className="payment-option"></div>
            </div>
            <div className="">
              <Button color="#00AEEF" size="lg" block className="mt-3 pay-btn">
                Pay $600
              </Button>
            </div>
          </div>
          <div className="d-flex flex-column px-3 py-2 order-info">
            <Button color="#FFFFFF" className="order-summary">
              Order Summary #23344334
            </Button>
            <div className="d-flex flex-column justify-content-between mt-2 order-details">
              <div className="d-flex flex-column justify-content-between my-1 order-time">
                <div className="d-flex flex-row mb-2 justify-content-between">
                  <div>Date</div>
                  <div>wen, 9 jun , 2021</div>
                </div>
                <div className="d-flex flex-row mb-2 justify-content-between">
                  <div>Time</div>
                  <div>01:50 PM</div>
                </div>
              </div>
              <div className="d-flex flex-column my-1 order-price">
                <div className="d-flex flex-row mb-2 justify-content-between">
                  <div>Lorem ipsum</div>
                  <div>Price</div>
                </div>
                <div className="d-flex flex-row mb-2 justify-content-between">
                  <div>Lorem ipsum</div>
                  <div className="price">$600</div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between my-1 order-total-price">
                <div>Total</div>
                <div className="price">$600</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
