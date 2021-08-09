import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { selectThemeColors } from "@utils";
import { useHistory } from "react-router-dom";
import NumberInput from "@components/number-input";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const Ranthambare = () => {
  const history = useHistory();
  const classes = useStyles();
  const [readmore, setReadMore] = useState(true);
  const [numDay, setNumDay] = useState(6);
  const [numPass, setNumPass] = useState(3);
  const readMoreHandler = () => {
    setReadMore(false);
  };
  const hideSomeHandler = () => {
    setReadMore(true);
  };
  console.log(history.location.state);

  useEffect(() => {
    console.log(numDay);
    console.log(numPass);
  }, [numDay, numPass]);

  return (
    <div className="ranthambare-package">
      <h2 className="mt-2">Sundarban Package</h2>
      <div className="p-5 d-flex flex-column justify-content-between align-items-center">
        <div className="card-img">
          <img
            src={require("@src/assets/images/card-background.png").default}
          />
        </div>
        <div className="my-3 justify-content-between card-details">
          <div className="card-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmodtempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmodtempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`${readmore ? classes.hideSome : classes.readmore}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmodtempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmodtempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <a
              className={`${
                readmore ? classes.readMore : classes.hideSome
              } read-more`}
              onClick={readMoreHandler}
            >
              read more
            </a>
            <a
              className={`${
                readmore ? classes.hideSome : classes.readMore
              } read-more`}
              onClick={hideSomeHandler}
            >
              hide some
            </a>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center card-option p-3">
            <h4>Choose number of days you want to spent</h4>
            <div className="px-5 py-2">
              <NumberInput
                value={6}
                onChange={(value) => setNumDay(value)}
                className="value-size"
              />
            </div>
            <h4>Choose the number of passangers</h4>
            <div className="px-5 py-2">
              <NumberInput
                value={3}
                onChange={(value) => setNumPass(value)}
                className="value-size"
              />
            </div>
            <Button
              onClick={() => history.push("payment")}
              color="#00AEEF"
              size="lg"
              block
              className="mt-3 continue"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  readMore: {
    display: "flex",
  },
  hideSome: {
    display: "none",
  },
}));

export default Ranthambare;
