import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  Row,
  Col,
} from "reactstrap";
import { ReactCountryDropdown } from "react-country-dropdown";
import { selectThemeColors } from "@utils";
import Nouislider from "nouislider-react";
import Select from "react-select";
import { Search } from "react-feather";
import "@styles/react/libs/noui-slider/noui-slider.scss";
import "react-country-dropdown/dist/index.css";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState("1");
  const history = useHistory();

  return (
    <div className="home">
      <h2 className="offset-2 mt-2">Home</h2>
    </div>
  );
};

export default Home;
