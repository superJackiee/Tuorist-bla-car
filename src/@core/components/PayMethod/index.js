import { Card } from "reactstrap";
import AppCollapse from "@components/app-collapse";
import bkash from "@assets/icons/bkash.svg";
import mpesa from "@assets/icons/mpesa.svg";
import paypal from "@assets/icons/paypal.svg";
import cash from "@assets/icons/cash.svg";
const data = [
  {
    title: "Other local payments",
    content: (
      <Card className="mb-0">
        <div className="d-flex flex-row payment-method">
          <img src={bkash} width="30" alt=""></img>
          <span className="ml-2 my-1">bkash</span>
        </div>
        <div className="d-flex flex-row payment-method">
          <img src={mpesa} width="30" alt=""></img>
          <span className="ml-2 my-1">mpesa</span>
        </div>
        <div className="d-flex flex-row payment-method">
          <img src={paypal} width="30" alt=""></img>
          <span className="ml-2 my-1">paypal</span>
        </div>
        <div className="d-flex flex-row payment-method">
          <img src={cash} width="30" alt=""></img>
          <span className="ml-2 my-1">Cash</span>
        </div>
      </Card>
    ),
  },
];

const PayMethod = () => <AppCollapse data={data} />;

export default PayMethod;
