import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import { useHistory } from "react-router-dom";
import NumberInput from "@components/number-input";
import PayMethod from "@components/PayMethod";
import masterCard from "@assets/icons/masterCard.svg";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
const Payment = (props) => {
  const classes = useStyles();

  const history = useHistory();
  // console.log(history.location.state);

  const onPayHandler = () => {
    history.push("/sign");
  };

  const [creditCardActive, setCreditCardActive] = useState(false);

  const onCreditHandler = () => {
    setCreditCardActive(!creditCardActive);
  };
  return (
    <div className="payment">
      <SuccessPayment />
      <h2 className="mt-2">Checkout</h2>
      <div className="container-lg wrapper">
        <h4 className="pl-3">Select payment method</h4>
        <div className="mt-3 justify-content-between payment-wrapper">
          <div className="d-flex flex-column payment-section">
            <div className="d-flex flex-row">
              <div className="mr-3">
                <button
                  onClick={() => onCreditHandler()}
                  className={`${
                    creditCardActive
                      ? classes.creditCardBtn
                      : classes.creditCardBtnDefault
                  } credit-card p-1`}
                >
                  Credit card
                </button>
              </div>
              <div className="payment-option">
                <PayMethod />
              </div>
            </div>
            <div
              className={`${
                creditCardActive ? classes.creditInfo : classes.creditInfoHidden
              } information p-5 mt-2`}
            >
              <Form>
                <FormGroup>
                  <Input type="text" placeholder="Card number" />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name of card"
                    className="mt-2"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Exiration date ( MM / YY )"
                    className="mt-2"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Security code ( CVV )"
                    className="mt-2"
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="text" placeholder="Type card" className="mt-2" />
                </FormGroup>
                <FormGroup>
                  <Input type="text" placeholder="Type card" className="mt-2" />
                </FormGroup>
                <Button
                  onClick={() => history.push("payment")}
                  color="#00AEEF"
                  size="lg"
                  block
                  className="mt-3"
                >
                  Pay $600
                </Button>
              </Form>
            </div>
            <div
              className={`${
                creditCardActive ? classes.creditInfo : classes.creditInfoHidden
              } align-items-center py-2`}
            >
              <p>Choose your Existing card</p>
              <div
                className={`${classes.masterContent} d-flex flex-row justify-content-between align-items-center px-2 py-1 full-width`}
              >
                <div className="d-flex flex-row">
                  <img src={masterCard} alt=""></img>
                  <div className="ml-5">
                    <p className={`${classes.secondaryBlue} mb-0`}>
                      Mastercard
                    </p>
                    <p className={`${classes.secondaryBlue} mb-0`}>
                      Debit ...3456
                    </p>
                  </div>
                </div>
                <svg
                  width="17"
                  height="31"
                  viewBox="0 0 17 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1573 16.2599L2.41657 29.7093C2.19849 29.9217 1.90613 30.0405 1.60174 30.0405C1.29735 30.0405 1.00498 29.9217 0.786909 29.7093C0.680041 29.6054 0.595093 29.481 0.53709 29.3437C0.479088 29.2063 0.449219 29.0587 0.449219 28.9096C0.449219 28.7605 0.479088 28.6129 0.53709 28.4756C0.595093 28.3382 0.680041 28.2139 0.786909 28.1099L13.7032 15.4684L0.786909 2.82696C0.680462 2.72303 0.59587 2.59886 0.538118 2.46176C0.480365 2.32466 0.450624 2.17739 0.450624 2.02862C0.450624 1.87985 0.480365 1.73258 0.538118 1.59548C0.59587 1.45838 0.680462 1.33421 0.786909 1.23028C1.00498 1.01793 1.29735 0.899096 1.60174 0.899096C1.90613 0.899096 2.19849 1.01793 2.41657 1.23028L16.1573 14.6797C16.2642 14.7837 16.3491 14.908 16.4071 15.0454C16.4651 15.1827 16.495 15.3303 16.495 15.4794C16.495 15.6285 16.4651 15.7761 16.4071 15.9135C16.3491 16.0508 16.2642 16.1752 16.1573 16.2791V16.2599Z"
                    fill="#2E2E2E"
                  />
                </svg>
              </div>
            </div>
            <div
              className={
                creditCardActive ? classes.creditInfoHidden : classes.creditInfo
              }
            >
              <Button
                color="#00AEEF"
                size="lg"
                block
                className="mt-3 pay-btn"
                onClick={onPayHandler}
              >
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
const useStyles = makeStyles((theme) => ({
  creditCardBtn: {
    backgroundColor: "#00AEEF",
    color: "#FFFFFF",
  },
  creditCardBtnDefault: {
    backgroundColor: "#FFFFFF",
  },
  creditInfoHidden: {
    display: "none",
  },
  creditInfo: {
    display: "flex",
    flexDirection: "column",
  },
  secondaryBlue: {
    color: "#00AEEF",
  },
  masterContent: {
    background: "#F5F5F5",
    borderRadius: "10px",
  },
}));

const SuccessPayment = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="success" isOpen={visible} toggle={onDismiss}>
      You have successfully booked the ride
    </Alert>
  );
};
export default Payment;
