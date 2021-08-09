import React from "react";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import "react-languages-select/scss/react-languages-select.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-lg p-2 d-flex flex-column justify-content-between">
        <h2>Lorem ipsum</h2>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore
          </p>
        </div>
        <div className="align-right">
          <ReactLanguageSelect placeholder="Select Language" />
        </div>
        <div>
          <p>Goby24, 2021 ©</p>

          <p>
            Goby24 is the leading carpooling app in the world. Forget going into
            the city to get out of town. We connect people together, making it
            possible to travel literally anywhere, directly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
