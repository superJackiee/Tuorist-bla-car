import React, { useState, useEffect } from "react";
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
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { ReactCountryDropdown } from "react-country-dropdown";
import { selectThemeColors } from "@utils";
import Nouislider from "nouislider-react";
import Select from "react-select";
import { Search } from "react-feather";
import "@styles/react/libs/noui-slider/noui-slider.scss";
import "react-country-dropdown/dist/index.css";
import { useHistory } from "react-router-dom";

const cityOptions = [
  { value: "Mumbai", label: "Mumbai" },
  { value: "Bengaluru", label: "Bengaluru" },
];
const sortOptions = [
  { value: "Sortby", label: "Sort by" },
  { value: "AZ", label: "A ~ Z" },
  { value: "Decentalize", label: "Decentralize" },
];

const Tourist = () => {
  const [active, setActive] = useState("3");
  const [filterExpand, setFilterExpand] = useState(false);
  const history = useHistory();

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const classes = useStyles();

  const mediaMatch = window.matchMedia("(min-width: 768px)");

  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return (
    <div className="tourist-package">
      <h2 className="mt-2" style={{ paddingLeft: "5vw" }}>
        Tourist Package
      </h2>
      <div className="d-flex tourist-wrapper">
        <div
          className={`${
            active === "1" ? classes.filterBoxUp : classes.filterBoxDown
          }`}
        >
          <div className="filter-box">
            <div
              className={`${
                filterExpand ? classes.hidden : classes.show
              } filter-1 p-1`}
              onClick={() => setFilterExpand(true)}
            >
              <svg
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                className={classes.shrink}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M23.9399 0.168945H5.31598C2.45529 0.168945 0.12793 2.57656 0.12793 5.5359V24.8021C0.12793 27.7613 2.45529 30.1689 5.31598 30.1689H23.9399C26.8006 30.1689 29.1279 27.7613 29.1279 24.802V5.5359C29.1279 2.57656 26.8006 0.168945 23.9399 0.168945ZM27.4287 24.802C27.4287 26.7921 25.8636 28.4111 23.9399 28.4111H5.31598C3.39224 28.4111 1.82715 26.7921 1.82715 24.802V5.5359C1.82715 3.54582 3.39224 1.92676 5.31598 1.92676H23.9399C25.8636 1.92676 27.4287 3.54582 27.4287 5.5359V24.802Z"
                    fill="#2E2E2E"
                  />
                  <path
                    d="M24.6382 6.75877H11.698C11.3423 5.6657 10.3429 4.87598 9.16779 4.87598C7.99272 4.87598 6.9933 5.6657 6.63754 6.75877H4.61768C4.14846 6.75877 3.76807 7.15229 3.76807 7.63768C3.76807 8.12307 4.14846 8.51658 4.61768 8.51658H6.63759C6.99335 9.60965 7.99278 10.3994 9.16784 10.3994C10.3429 10.3994 11.3423 9.60965 11.6981 8.51658H24.6383C25.1075 8.51658 25.4879 8.12307 25.4879 7.63768C25.4879 7.15229 25.1075 6.75877 24.6382 6.75877ZM9.16779 8.64156C8.6327 8.64156 8.19736 8.19121 8.19736 7.63768C8.19736 7.08414 8.6327 6.63379 9.16779 6.63379C9.70287 6.63379 10.1382 7.08414 10.1382 7.63768C10.1382 8.19121 9.70287 8.64156 9.16779 8.64156Z"
                    fill="#2E2E2E"
                  />
                  <path
                    d="M24.6382 14.29H22.6183C22.2625 13.197 21.2631 12.4072 20.088 12.4072C18.913 12.4072 17.9136 13.197 17.5578 14.29H4.61768C4.14846 14.29 3.76807 14.6835 3.76807 15.1689C3.76807 15.6543 4.14846 16.0478 4.61768 16.0478H17.5578C17.9136 17.1409 18.9131 17.9306 20.0881 17.9306C21.2631 17.9306 22.2626 17.1409 22.6183 16.0478H24.6383C25.1075 16.0478 25.4879 15.6543 25.4879 15.1689C25.4879 14.6835 25.1075 14.29 24.6382 14.29ZM20.0881 16.1728C19.553 16.1728 19.1177 15.7225 19.1177 15.1689C19.1177 14.6154 19.553 14.165 20.0881 14.165C20.6232 14.165 21.0585 14.6154 21.0585 15.1689C21.0585 15.7225 20.6232 16.1728 20.0881 16.1728Z"
                    fill="#2E2E2E"
                  />
                  <path
                    d="M24.6382 21.8213H15.3382C14.9824 20.7282 13.983 19.9385 12.8079 19.9385C11.6328 19.9385 10.6334 20.7282 10.2777 21.8213H4.61768C4.14846 21.8213 3.76807 22.2148 3.76807 22.7002C3.76807 23.1856 4.14846 23.5791 4.61768 23.5791H10.2777C10.6334 24.6721 11.6328 25.4619 12.8079 25.4619C13.983 25.4619 14.9824 24.6721 15.3382 23.5791H24.6383C25.1075 23.5791 25.4879 23.1856 25.4879 22.7002C25.4879 22.2148 25.1075 21.8213 24.6382 21.8213ZM12.8079 23.7041C12.2728 23.7041 11.8375 23.2538 11.8375 22.7002C11.8375 22.1467 12.2728 21.6963 12.8079 21.6963C13.343 21.6963 13.7783 22.1466 13.7783 22.7002C13.7783 23.2537 13.343 23.7041 12.8079 23.7041Z"
                    fill="#2E2E2E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="29"
                      height="30"
                      fill="white"
                      transform="translate(0.12793 0.168945)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className={`${
                filterExpand ? classes.show : classes.hidden
              } filter-2`}
            >
              <div className="filter-header p-1 pl-2 pr-2">
                <div className="d-flex justify-content-between align-items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M23.9399 0.168945H5.31598C2.45529 0.168945 0.12793 2.57656 0.12793 5.5359V24.8021C0.12793 27.7613 2.45529 30.1689 5.31598 30.1689H23.9399C26.8006 30.1689 29.1279 27.7613 29.1279 24.802V5.5359C29.1279 2.57656 26.8006 0.168945 23.9399 0.168945ZM27.4287 24.802C27.4287 26.7921 25.8636 28.4111 23.9399 28.4111H5.31598C3.39224 28.4111 1.82715 26.7921 1.82715 24.802V5.5359C1.82715 3.54582 3.39224 1.92676 5.31598 1.92676H23.9399C25.8636 1.92676 27.4287 3.54582 27.4287 5.5359V24.802Z"
                        fill="#2E2E2E"
                      />
                      <path
                        d="M24.6382 6.75877H11.698C11.3423 5.6657 10.3429 4.87598 9.16779 4.87598C7.99272 4.87598 6.9933 5.6657 6.63754 6.75877H4.61768C4.14846 6.75877 3.76807 7.15229 3.76807 7.63768C3.76807 8.12307 4.14846 8.51658 4.61768 8.51658H6.63759C6.99335 9.60965 7.99278 10.3994 9.16784 10.3994C10.3429 10.3994 11.3423 9.60965 11.6981 8.51658H24.6383C25.1075 8.51658 25.4879 8.12307 25.4879 7.63768C25.4879 7.15229 25.1075 6.75877 24.6382 6.75877ZM9.16779 8.64156C8.6327 8.64156 8.19736 8.19121 8.19736 7.63768C8.19736 7.08414 8.6327 6.63379 9.16779 6.63379C9.70287 6.63379 10.1382 7.08414 10.1382 7.63768C10.1382 8.19121 9.70287 8.64156 9.16779 8.64156Z"
                        fill="#2E2E2E"
                      />
                      <path
                        d="M24.6382 14.29H22.6183C22.2625 13.197 21.2631 12.4072 20.088 12.4072C18.913 12.4072 17.9136 13.197 17.5578 14.29H4.61768C4.14846 14.29 3.76807 14.6835 3.76807 15.1689C3.76807 15.6543 4.14846 16.0478 4.61768 16.0478H17.5578C17.9136 17.1409 18.9131 17.9306 20.0881 17.9306C21.2631 17.9306 22.2626 17.1409 22.6183 16.0478H24.6383C25.1075 16.0478 25.4879 15.6543 25.4879 15.1689C25.4879 14.6835 25.1075 14.29 24.6382 14.29ZM20.0881 16.1728C19.553 16.1728 19.1177 15.7225 19.1177 15.1689C19.1177 14.6154 19.553 14.165 20.0881 14.165C20.6232 14.165 21.0585 14.6154 21.0585 15.1689C21.0585 15.7225 20.6232 16.1728 20.0881 16.1728Z"
                        fill="#2E2E2E"
                      />
                      <path
                        d="M24.6382 21.8213H15.3382C14.9824 20.7282 13.983 19.9385 12.8079 19.9385C11.6328 19.9385 10.6334 20.7282 10.2777 21.8213H4.61768C4.14846 21.8213 3.76807 22.2148 3.76807 22.7002C3.76807 23.1856 4.14846 23.5791 4.61768 23.5791H10.2777C10.6334 24.6721 11.6328 25.4619 12.8079 25.4619C13.983 25.4619 14.9824 24.6721 15.3382 23.5791H24.6383C25.1075 23.5791 25.4879 23.1856 25.4879 22.7002C25.4879 22.2148 25.1075 21.8213 24.6382 21.8213ZM12.8079 23.7041C12.2728 23.7041 11.8375 23.2538 11.8375 22.7002C11.8375 22.1467 12.2728 21.6963 12.8079 21.6963C13.343 21.6963 13.7783 22.1466 13.7783 22.7002C13.7783 23.2537 13.343 23.7041 12.8079 23.7041Z"
                        fill="#2E2E2E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width="29"
                          height="30"
                          fill="white"
                          transform="translate(0.12793 0.168945)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="ml-1 mr-3">Filter</div>
                </div>
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${classes.shrink} ml-5`}
                  onClick={() => setFilterExpand(false)}
                >
                  <path
                    d="M0.978349 9.6641L9.80336 1.02618C9.94342 0.889796 10.1312 0.813476 10.3267 0.813476C10.5222 0.813477 10.71 0.889796 10.85 1.02618C10.9186 1.09296 10.9732 1.17281 11.0105 1.26103C11.0477 1.34925 11.0669 1.44404 11.0669 1.5398C11.0669 1.63556 11.0477 1.73035 11.0105 1.81856C10.9732 1.90678 10.9186 1.98664 10.85 2.05341L2.55449 10.1724L10.85 18.2914C10.9184 18.3582 10.9727 18.4379 11.0098 18.526C11.0469 18.614 11.066 18.7086 11.066 18.8042C11.066 18.8997 11.0469 18.9943 11.0098 19.0824C10.9727 19.1704 10.9184 19.2502 10.85 19.3169C10.71 19.4533 10.5222 19.5296 10.3267 19.5296C10.1312 19.5296 9.94342 19.4533 9.80336 19.3169L0.978349 10.679C0.909713 10.6122 0.855155 10.5323 0.817903 10.4441C0.78065 10.3559 0.761467 10.2611 0.761467 10.1654C0.761467 10.0696 0.78065 9.97481 0.817903 9.8866C0.855155 9.79838 0.909713 9.71852 0.978349 9.65175L0.978349 9.6641Z"
                    fill="#2E2E2E"
                  />
                </svg>
              </div>
              <FormGroup className="pl-2 pr-2">
                <Label for="default-range" className="slider-title">
                  Days
                </Label>
                <Nouislider
                  start={10}
                  direction={"rtl"}
                  tooltips={true}
                  range={{
                    min: 0,
                    max: 100,
                  }}
                />
              </FormGroup>
              <FormGroup className="pl-2 pr-2 filter-border pb-1">
                <Label for="default-range" className="slider-text">
                  Price
                </Label>
                <div className="d-flex justify-content-between">
                  <span className="slider-text-p">Min price</span>
                  <span className="slider-text-p">Max price</span>
                </div>
                <Nouislider
                  start={10}
                  direction={"rtl"}
                  tooltips={true}
                  range={{
                    min: 0,
                    max: 100,
                  }}
                />
              </FormGroup>
              <FormGroup className="pl-2 pr-2">
                <Label for="default-range" className="slider-text">
                  Choose country
                </Label>
                <div className="chose-country-1">
                  <ReactCountryDropdown
                    onSelect={console.log}
                    countryCode="IN"
                    className="w-100 chose-country-1"
                  />
                </div>
              </FormGroup>
              <FormGroup className="pl-2 pr-2">
                <Label for="default-range" className="slider-text">
                  Choose your city
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={cityOptions[0]}
                  options={cityOptions}
                  isClearable={false}
                />
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="pl-2 pr-5 w-100">
          <Nav tabs className="justify-content-center">
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  // toggle("1");
                  history.push("tourist");
                }}
              >
                Tourist package offers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                Request from tourist
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              <div className="search-cover">
                <div>
                  <InputGroup className="d-flex align-items-center list-search">
                    <InputGroupAddon addonType="prepend" className="pl-1">
                      <Search size={20} />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      className="border-0"
                      placeholder="Search here"
                    />
                  </InputGroup>
                </div>
                <div style={{ width: "200px" }}>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={sortOptions[0]}
                    options={sortOptions}
                    isClearable={false}
                  />
                </div>
              </div>
              <div className="item-list">
                <Row>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() =>
                        history.push("sundarban", { sdfsdf: "sdfsdf" })
                      }
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div style={{ textAlign: "-webkit-center" }}>
                <div className="chose-country mb-3 p-1 d-flex flex-column justify-content-center justify-content-between align-items-center">
                  <h4>Choose your country</h4>
                  <FormGroup className="chose-country-2 pl-2 pr-2">
                    <ReactCountryDropdown
                      onSelect={console.log}
                      countryCode="IN"
                      className="w-100"
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="search-cover">
                <div>
                  <InputGroup className="d-flex align-items-center list-search">
                    <InputGroupAddon addonType="prepend" className="pl-1">
                      <Search size={20} />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      className="border-0"
                      placeholder="Search here"
                    />
                  </InputGroup>
                </div>
                <div style={{ width: "200px" }}>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={sortOptions[0]}
                    options={sortOptions}
                    isClearable={false}
                  />
                </div>
              </div>
              <div className="item-list">
                <Row>
                  <Col md="3">
                    <Card
                      name={"Ranthambore National Park"}
                      onClick={() =>
                        history.push("ranthambare", { sdfsdf: "sdfsdf" })
                      }
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Ranthambore National Park"}
                      onClick={() => history.push("ranthambare")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Ranthambore National Park"}
                      onClick={() => history.push("ranthambare")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Ranthambore National Park"}
                      onClick={() => history.push("ranthambare")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                  <Col md="3">
                    <Card
                      name={"Sundarban"}
                      onClick={() => history.push("sundarban")}
                    />
                  </Col>
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardText: (isRowBased) => ({
    fontSize: isRowBased ? "2w" : "4vw",
  }),
};

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  shrink: {
    cursor: "pointer",
  },
  filterBoxUp: {
    marginTop: "10vh",
  },
  filterBoxDown: {
    marginTop: "30vh",
  },
}));

export default Tourist;

const Card = ({ onClick, name, matches }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={require("@src/assets/images/card-image.png").default} />
      <div className="details">
        <h4 className="title">{name}</h4>
        <div className="d-flex align-items-center justify-content-between">
          <p className="price mr-1">4300TK</p>
          <div className="d-flex justify-content-between align-items-center">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.83164 12.6243C8.9305 12.7189 9.0645 12.7721 9.20434 12.7721C9.34405 12.7721 9.47804 12.719 9.5769 12.6243L11.4584 10.8212C11.6643 10.6239 11.6643 10.3042 11.4584 10.1069C11.2526 9.90969 10.9189 9.90969 10.7131 10.1069L9.20434 11.5528L8.51641 10.8935C8.31052 10.6963 7.9769 10.6963 7.77101 10.8935C7.56526 11.0907 7.56526 11.4105 7.77101 11.6078L8.83164 12.6243Z"
                fill="#2E2E2E"
              />
              <path
                d="M9.61485 15.3751C11.9217 15.3751 13.7984 13.5764 13.7984 11.3657C13.7984 9.15495 11.9217 7.35645 9.61485 7.35645C7.30785 7.35645 5.43115 9.15495 5.43115 11.3657C5.43115 13.5764 7.30799 15.3751 9.61485 15.3751ZM9.61485 8.36649C11.3405 8.36649 12.7445 9.71191 12.7445 11.3657C12.7445 13.0195 11.3405 14.365 9.61485 14.365C7.88916 14.365 6.48511 13.0195 6.48511 11.3657C6.48511 9.71191 7.88916 8.36649 9.61485 8.36649Z"
                fill="#2E2E2E"
              />
              <path
                d="M16.6292 1.75609H15.6679V1.18569C15.6679 0.906815 15.432 0.680664 15.141 0.680664C14.85 0.680664 14.614 0.906815 14.614 1.18569V1.75609H13.5784V1.18569C13.5784 0.906815 13.3424 0.680664 13.0513 0.680664C12.7603 0.680664 12.5243 0.906815 12.5243 1.18569V1.75609H6.70494V1.18569C6.70494 0.906815 6.46896 0.680664 6.17783 0.680664C5.88683 0.680664 5.65085 0.906815 5.65085 1.18569V1.75609H4.61527V1.18569C4.61527 0.906815 4.37929 0.680664 4.08816 0.680664C3.79716 0.680664 3.56118 0.906815 3.56118 1.18569V1.75609H2.59982C1.6601 1.75609 0.895508 2.48882 0.895508 3.38951V16.1518C0.895508 17.0524 1.6601 17.7851 2.59982 17.7851H16.6292C17.569 17.7851 18.3335 17.0524 18.3335 16.1518V3.38951C18.3335 2.48882 17.5689 1.75609 16.6292 1.75609ZM17.2794 16.1518C17.2794 16.4954 16.9877 16.7751 16.6292 16.7751H2.59982C2.24128 16.7751 1.94947 16.4954 1.94947 16.1518V5.9556H17.2794V16.1518ZM1.94947 3.38951C1.94947 3.04578 2.24128 2.76626 2.59982 2.76626H3.56118V3.33666C3.56118 3.61553 3.79716 3.84168 4.08829 3.84168C4.37929 3.84168 4.61527 3.61553 4.61527 3.33666V2.76626H5.65085V3.33666C5.65085 3.61553 5.88683 3.84168 6.17796 3.84168C6.46896 3.84168 6.70494 3.61553 6.70494 3.33666V2.76626H12.5243V3.33666C12.5243 3.61553 12.7603 3.84168 13.0514 3.84168C13.3424 3.84168 13.5784 3.61553 13.5784 3.33666V2.76626H14.614V3.33666C14.614 3.61553 14.85 3.84168 15.141 3.84168C15.4321 3.84168 15.6681 3.61553 15.6681 3.33666V2.76626H16.6292C16.9877 2.76626 17.2795 3.04578 17.2795 3.38951V4.94542H1.94947V3.38951Z"
                fill="#2E2E2E"
              />
            </svg>
            <p className="ml-1 date">25th Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};
