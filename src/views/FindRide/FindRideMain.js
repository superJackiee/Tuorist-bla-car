import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTutorial,
  updateTutorialsByTitle,
  deleteAllTutorials,
} from "../../redux/actions/offer";
import Accordion from "@material-ui/core/Accordion";
import Avatar from "@material-ui/core/Avatar";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PetsIcon from "@material-ui/icons/Pets";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { placeHttpRequest } from "../../http-common";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00AEEF",
    },
    secondary: {
      main: "#F57F20",
    },
  },
});

const FindRideMain = (props) => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [smoke, setSmoke] = useState(false);
  const [pet, setPet] = useState(false);
  const [number, setNumber] = React.useState(1);
  const [initialized, setInitialized] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [journey, setJourney] = useState(null);
  const [startId, setStartId] = useState({});
  const [startLabel, setStartLabel] = useState("");
  const [endId, setEndId] = React.useState({});
  const [endLabel, setEndLabel] = React.useState("");
  const classes = useStyles();

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const offer = useSelector((state) => {
    return state.offer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialized) return;
    if (offer && offer.length > 0) {
      offer.map((each) => {
        if (each.title === "journey_date") {
          const date = new Date(each.description);
          setJourney(date.toLocaleDateString());
        }
        if (each.title === "start") {
          setStartId(each.description);
        }
        if (each.title === "end") {
          setEndId(each.description);
        }
      });
    }
    dispatch(deleteAllTutorials());
    dispatch(
      createTutorial("start", {
        label: "",
        value: "",
      })
    );
    dispatch(
      createTutorial("end", {
        label: "",
        value: "",
      })
    );
    dispatch(createTutorial("journey_date", journey ? journey : new Date()));
    // dispatch(createTutorial("route", 0));
    // dispatch(createTutorial("points", []));
    // dispatch(createTutorial("paths", []));
    setInitialized(true);
  });

  useEffect(() => {
    if (startId && startId.value) {
      dispatch(updateTutorialsByTitle("start", startId));
    }
  }, [startId]);

  useEffect(() => {
    if (endId && endId.value) {
      dispatch(updateTutorialsByTitle("end", endId));
    }
  }, [endId]);

  const onStartIdChanged = (event, newId) => {
    setStartId(newId);
  };

  const onEndIdChanged = (event, newId) => {
    setEndId(newId);
  };

  const onStartLabelChanged = (event, newLabel) => {
    placeHttpRequest.get(`/?query=${newLabel}`).then((response) => {
      const data = [];
      for (const place of response.data.result) {
        data.push({ label: place.description, value: place.place_id });
      }
      setPlaceList(data);
    });
    setStartLabel(newLabel);
  };

  const onEndLabelChanged = (event, newLabel) => {
    placeHttpRequest.get(`/?query=${newLabel}`).then((response) => {
      const data = [];
      for (const place of response.data.result) {
        data.push({ label: place.description, value: place.place_id });
      }
      setPlaceList(data);
    });
    setEndLabel(newLabel);
  };

  const btnSmokeHandler = () => {
    setSmoke(!smoke);
  };

  const btnPetHandler = () => {
    setPet(!pet);
  };

  const numberChange = (num) => {
    setNumber(num);
  };

  const btnDateHandler = () => {
    props.history.push("/findpickuptime", { from: "find" });
  };

  const btnContinueHandler = () => {
    props.history.push("/ridelist");
  };

  const btnItemHandler = (idx) => {
    // if (!sure) {
    props.history.push("/ridelist");
  };

  return (
    <div className="list row mw-100">
      <div className={"col-md-6"}>
        <div className="text-center" style={styles.leftContainer(matches)}>
          <ThemeProvider theme={theme}>
            <h5 className={""} style={styles.txtTitle(matches)}>
              Find a ride
            </h5>

            <div style={styles.leftPan(matches)}>
              <div className="input-group ">
                <div className={classes.pane} style={{ width: "100%" }}>
                  <Autocomplete
                    id="start"
                    value={startId}
                    onChange={onStartIdChanged}
                    inputValue={startLabel}
                    onInputChange={onStartLabelChanged}
                    options={placeList}
                    getOptionLabel={(option) => option.label}
                    style={styles.inputSearch(matches)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        placeholder="Leaving from"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="input-group ">
                <div className={classes.pane} style={{ width: "100%" }}>
                  <Autocomplete
                    id="end"
                    value={endId}
                    onChange={onEndIdChanged}
                    inputValue={endLabel}
                    onInputChange={onEndLabelChanged}
                    options={placeList}
                    getOptionLabel={(option) => option.label}
                    style={styles.inputSearch(matches)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        placeholder="Going to"
                      />
                    )}
                  />
                </div>
              </div>

              <button
                className="btn btn-sm"
                style={{
                  ...styles.btnContinue(matches),
                  ...styles.btnDate(matches),
                }}
                onClick={btnDateHandler}
              >
                {journey ? journey : "Journey Date"}
              </button>

              <div className={matches ? classes.root : classes.mobile_root}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Number of seats to book</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div style={styles.numContainer}>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 1 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(1);
                        }}
                      >
                        1
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 2 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(2);
                        }}
                      >
                        2
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 3 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(3);
                        }}
                      >
                        3
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 4 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(4);
                        }}
                      >
                        4
                      </span>
                    </div>

                    <div style={styles.numContainer}>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 5 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(5);
                        }}
                      >
                        5
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 6 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(6);
                        }}
                      >
                        6
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 7 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(7);
                        }}
                      >
                        7
                      </span>
                      <span
                        style={{
                          ...styles.numCircle(matches),
                          ...(number === 8 ? styles.activeCircle : ""),
                        }}
                        onClick={() => {
                          numberChange(8);
                        }}
                      >
                        8
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Advanced Options</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={styles.iconsContainer(matches)}>
                      <div
                        style={styles.iconItem(matches)}
                        onClick={btnSmokeHandler}
                      >
                        <div className={smoke ? classes.active : ""}>
                          <Avatar>
                            <SmokingRoomsIcon />
                          </Avatar>
                        </div>
                        <span style={styles.iconText(matches)}>Smoker</span>
                      </div>
                      <div
                        style={styles.iconItem(matches)}
                        onClick={btnPetHandler}
                      >
                        <div className={pet ? classes.active : ""}>
                          <Avatar>
                            <PetsIcon />
                          </Avatar>
                        </div>
                        <span style={styles.iconText(matches)}>
                          Ride with pet
                        </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

              <button
                className="btn btn-sm"
                style={styles.btnContinue(matches)}
                onClick={btnContinueHandler}
              >
                Continue
              </button>
            </div>
          </ThemeProvider>
        </div>
      </div>

      <div className="col-md-6 p-0">
        <div className="" style={styles.rightContainer(matches)}>
          <div className="input-group " style={styles.offerItem(matches)}>
            <button
              className="controls form-control comebackBtn"
              style={{ ...styles.btnDiv(matches) }}
              onClick={() => btnItemHandler(0)}
            >
              <span>Mumbai</span>
              <div>
                <span>Mumbai, Maharashtra, India</span>
                <span
                  className="material-icons"
                  style={styles.icFromTo(matches)}
                >
                  east
                </span>
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div>
                <span
                  className="material-icons"
                  style={styles.icSchedule(matches)}
                >
                  schedule
                </span>
                <span>2 Passengers</span>
              </div>
            </button>
            <span className="material-icons" style={styles.icNext(matches)}>
              navigate_next
            </span>
          </div>

          <div className="input-group " style={styles.offerItem(matches)}>
            <button
              className="controls form-control comebackBtn"
              style={{ ...styles.btnDiv(matches) }}
              onClick={() => btnItemHandler(1)}
            >
              <span>Mumbai</span>
              <div>
                <span>Mumbai, Maharashtra, India</span>
                <span
                  className="material-icons"
                  style={styles.icFromTo(matches)}
                >
                  east
                </span>
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div>
                <span
                  className="material-icons"
                  style={styles.icSchedule(matches)}
                >
                  schedule
                </span>
                <span>2 Passengers</span>
              </div>
            </button>
            <span className="material-icons" style={styles.icNext(matches)}>
              navigate_next
            </span>
          </div>

          <div className="input-group " style={styles.offerItem(matches)}>
            <button
              className="controls form-control comebackBtn"
              style={{ ...styles.btnDiv(matches) }}
              onClick={() => btnItemHandler(2)}
            >
              <span>Mumbai</span>
              <div>
                <span>Mumbai, Maharashtra, India</span>
                <span
                  className="material-icons"
                  style={styles.icFromTo(matches)}
                >
                  east
                </span>
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div>
                <span
                  className="material-icons"
                  style={styles.icSchedule(matches)}
                >
                  schedule
                </span>
                <span>2 Passengers</span>
              </div>
            </button>
            <span className="material-icons" style={styles.icNext(matches)}>
              navigate_next
            </span>
          </div>
        </div>
      </div>

      {/* <svg className="backBubble1" version="1.1">
        <circle cx="380" cy="120" r="200" fill="#EEF4FF" />
      </svg> */}

      <svg className="backBubble2" version="1.1">
        <circle cx="180" cy="490" r="480" fill="rgba(0, 174, 239, 0.44)" />
      </svg>
    </div>
  );
};

const styles = {
  leftContainer: (isRowBased) => ({
    width: isRowBased ? "35vw" : "70vw",
    // height: isRowBased ? "40vw" : "80vw",
    marginRight: isRowBased ? "0" : "auto",
    marginLeft: "auto",
    marginTop: isRowBased ? "12vh" : "12vh",
    marginBottom: isRowBased ? "12vh" : "12vh",
  }),
  leftPan: (isRowBased) => ({
    border: "1px solid #707070",
    borderRadius: "3vw",
    padding: "7%",
    width: "100%",
    marginTop: 0,
    backgroundColor: "white",
  }),
  rightContainer: (isRowBased) => ({
    padding: "0 4%",
    width: isRowBased ? "40vw" : "80vw",
    // height: isRowBased ? "100vh" : "50vh",
    margin: isRowBased ? "auto" : "10vh auto",
    marginTop: isRowBased ? "20vh" : "0vh",
  }),
  offerItem: (isRowBased) => ({
    marginBottom: isRowBased ? "1vw" : "2vw",
    border: "1px solid #2E2E2E",
    borderRadius: isRowBased ? "1.5vw" : "3vw",
    backgroundColor: "white",
  }),
  btnDiv: (isRowBased) => ({
    border: "none",
    height: "auto",
    fontSize: isRowBased ? "1vw" : "2.5vw",
    borderRadius: isRowBased ? "1.5vw" : "3vw",
    textAlign: "left",
    padding: "1em 2.5em",
  }),
  icFromTo: (isRowBased) => ({
    fontSize: isRowBased ? "1.3vw" : "2.6vw",
    margin: "0 0.3em",
    color: "#2E2E2E",
    // position: "absolute",
    // zIndex: 100,
    // top: "50%",
    // right: "-2%",
    transform: `translate(0%, 25%)`,
  }),
  icSchedule: (isRowBased) => ({
    fontSize: isRowBased ? "1.8vw" : "3.6vw",
    color: "#2E2E2E",
    position: "absolute",
    zIndex: 100,
    bottom: "15%",
    left: "1.5%",
    // transform: `translate(-50%, 50%)`,
  }),
  icNext: (isRowBased) => ({
    fontSize: isRowBased ? "2.5vw" : "5vw",
    color: "#2E2E2E",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    right: "-2%",
    transform: `translate(-50%, -50%)`,
  }),
  inputSearch: (isRowBased) => ({
    backgroundColor: "#F2F2F2",
    width: "100%",
    border: "none",
    height: isRowBased ? "2.5vw" : "6vw",
    fontSize: isRowBased ? "1vw" : "6vw",
    borderRadius: "2em",
    padding: 0,
    marginBottom: "2vw",
  }),
  btnContinue: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "8vw",
    width: "100%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1.15vw" : "3vw",
  }),
  btnDate: (isRowBased) => ({
    color: "#2E2E2E",
    backgroundColor: "#FFF",
    border: "1px solid #707070",
    borderRadius: isRowBased ? "3vw" : "6vw",
    marginBottom: isRowBased ? "1.5vw" : "3vw",
  }),
  iconsContainer: (isRowBased) => ({
    // backgroundColor: 'yellow',
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  }),
  iconItem: (isRowBased) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  iconText: (isRowBased) => ({
    fontFamily: "Poppins",
    fontSize: isRowBased ? "0.8vw" : "2.6vw",
  }),
  numContainer: {
    width: "100%",
    height: "100%",
    padding: "0 0.5vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  numCircle: (isRowBased) => ({
    width: isRowBased ? "3.5vw" : "6vw",
    height: isRowBased ? "3.5vw" : "6vw",

    border: "1px solid #00AEEF",
    borderRadius: "50%",
    textAlign: "center",
    padding: "0.6vw",
    fontFamily: "Rubik",
    fontSize: isRowBased ? "1.5vw" : "2.8vw",
    fontWeight: "650",
    margin: "1vw",
    display: "inline-block",
  }),
  activeCircle: {
    border: "none",
    backgroundColor: "#F57F20",
  },
  txtTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "4vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
  }),
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordion-root": {
      border: "1px solid rgb(112, 112, 112)",
      borderRadius: "2vw",
      marginBottom: "1.5vw !important",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: 0,
      height: "2.5vw",
    },
    "& .MuiTypography-root": {
      fontSize: "1.15vw",
      margin: "auto",
      fontFamily: "Poppins",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3vw",
      },
    },
    "& .MuiAvatar-root": {
      width: "4vw",
      height: "4vw",
    },
    "& .MuiSvgIcon-root": {
      width: "3vw",
      height: "3vw",
    },
    "& .MuiAccordionDetails-root": {
      paddingTop: "2.5vw",
      paddingBottom: "1vw",
    },
  },
  mobile_root: {
    width: "100%",
    "& .MuiAccordion-root": {
      border: "1px solid rgb(112, 112, 112)",
      borderRadius: "4vw",
      marginBottom: "3vw !important",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: 0,
      height: "5vw",
    },
    "& .MuiTypography-root": {
      fontSize: "2.3vw",
      margin: "auto",
      fontFamily: "Poppins",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3vw",
      },
    },
    "& .MuiAvatar-root": {
      width: "8vw",
      height: "8vw",
    },
    "& .MuiSvgIcon-root": {
      width: "6vw",
      height: "6vw",
    },
    "& .MuiAccordionDetails-root": {
      paddingTop: "5vw",
      paddingBottom: "2vw",
    },
  },
  active: {
    "& .MuiAvatar-root": {
      backgroundColor: "#F57F20",
    },
  },
  pane: {
    "& .MuiAutocomplete-input": {
      fontSize: "1vw",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5vw",
        padding: "5.5px 4px !important",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.5vw",
        padding: "5.5px 4px !important",
      },
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 39px 0 10px",
    },
  },
}));

export default FindRideMain;
