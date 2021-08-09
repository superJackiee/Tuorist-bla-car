import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTutorial,
  updateTutorialsByTitle,
  deleteAllTutorials,
} from "../../redux/actions/offer";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Map from "../Map.js";
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

const MapRoute = (props) => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [curRoute, setCurRoute] = React.useState("0");
  const [tolls, setTolls] = React.useState([]);
  const [routes, setRoutes] = React.useState([]);
  const [initialized, setInitialized] = useState(false);
  const [startId, setStartId] = React.useState({});
  const [startLabel, setStartLabel] = React.useState("");
  const [endId, setEndId] = React.useState({});
  const [endLabel, setEndLabel] = React.useState("");
  const [placeList, setPlaceList] = React.useState([]);
  const [disableContinue, setDisableContinue] = React.useState(false);

  const classes = useStyles();

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  useEffect(() => {
    if (!startLabel || !endLabel) {
      setDisableContinue(true);
    } else {
      setDisableContinue(false);
    }
  }, [startLabel, endLabel]);

  const tutorials = useSelector((state) => state.offer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialized) return;
    if (tutorials && tutorials.length > 0) {
      tutorials.map((item) => {
        if (item.title === "start") setStartId(item.description);
        if (item.title === "end") setEndId(item.description);
        setInitialized(true);
        return 0;
      });
    }
  }, [tutorials]);

  useEffect(() => {
    if (initialized) return;
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
    dispatch(createTutorial("route", 0));
    dispatch(createTutorial("points", []));
    dispatch(createTutorial("latlngs", []));
    dispatch(createTutorial("tolls", []));
    dispatch(createTutorial("paths", []));
    setInitialized(true);
  }, [tutorials]);

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

  const handleRadioChange = (event) => {
    setCurRoute(event.target.value);
  };

  const btnContinueHandler = () => {
    props.history.push("/boost");
  };

  const onStartIdChanged = (event, newId) => {
    setStartId(newId);
  };

  const onEndIdChanged = (event, newId) => {
    setEndId(newId);
  };

  const onStartLabelChanged = (event, newLabel) => {
    placeHttpRequest.get(`/?query=${newLabel}`).then((response) => {
      const data = [];
      response.data.result.map((place) => {
        data.push({ label: place.description, value: place.place_id });
      });
      setPlaceList(data);
    });

    setStartLabel(newLabel);
  };

  const onEndLabelChanged = (event, newLabel) => {
    placeHttpRequest.get(`/?query=${newLabel}`).then((response) => {
      const data = _.map(response.data.result, (place) => {
        return { label: place.description, value: place.place_id };
      });
      setPlaceList(data);
    });

    setEndLabel(newLabel);
  };

  return (
    <div className="list row mw-100">
      <div className="col-md-6 d-flex">
        <ThemeProvider theme={theme}>
          <div className="text-center" style={styles.leftContainer(matches)}>
            <h5 className={""} style={styles.txtTitle(matches)}>
              Pick-up
            </h5>

            <div className={classes.pane}>
              <div
                className="input-group "
                style={{ marginBottom: matches ? "1vw" : "2vw" }}
              >
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
                    <TextField {...params} label="" variant="outlined" />
                  )}
                />

                <span
                  className="material-icons"
                  style={styles.icSearch(matches)}
                >
                  search
                </span>
              </div>

              <h5 className="" style={styles.txtTitle(matches)}>
                Drop-off
              </h5>

              <div className="input-group ">
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
                    <TextField {...params} label="" variant="outlined" />
                  )}
                />

                <span
                  className="material-icons"
                  style={styles.icSearch(matches)}
                >
                  search
                </span>
              </div>
            </div>

            <div className="" style={styles.hDivider} />

            <h5 className="" style={styles.txtTitle(matches)}>
              Whats your route?
            </h5>

            <div className={classes.paneTwo} style={styles.radioContainer}>
              <Paper square>
                <FormControl component="fieldset">
                  <RadioGroup
                    id="route-selector"
                    aria-label="position"
                    name="position"
                    value={curRoute}
                    onChange={handleRadioChange}
                  >
                    {routes.length > 0 ? (
                      routes.map((route, index) => {
                        return (
                          <FormControlLabel
                            data-index={index}
                            value={`${index}`}
                            key={index}
                            control={<Radio name="position" color="primary" />}
                            label={
                              <div class="d-flex flex-column">
                                <span>{route}</span>
                                <span>
                                  {tolls[index] === 0 ? "No Toll" : "Tolls"}
                                </span>
                              </div>
                            }
                            labelPlacement="start"
                            // style={styles.lstRoutes(matches)}
                          />
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </RadioGroup>
                </FormControl>
              </Paper>
            </div>

            <button
              className="btn btn-sm"
              disabled={disableContinue}
              style={styles.btnContinue(matches)}
              onClick={btnContinueHandler}
            >
              Continue
            </button>
          </div>
        </ThemeProvider>
      </div>

      <div className="col-md-6 p-0">
        <Map
          startId={startId ? startId.value : null}
          endId={endId ? endId.value : null}
          onRouteChange={(list, tolls = []) => {
            setRoutes(list);
            setTolls(tolls);
            setCurRoute("0");
          }}
          currentRoute={curRoute}
        />
      </div>
    </div>
  );
};

const styles = {
  leftContainer: (isRowBased) => ({
    border: "1px solid #707070",
    padding: "7%",
    width: isRowBased ? "35vw" : "70vw",
    // height: isRowBased ? "70vh" : "75vh",
    margin: isRowBased ? "auto" : "10vh auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "3vw",
  }),
  icSearch: (isRowBased) => ({
    fontSize: isRowBased ? "1vw" : "2vw",
    color: "#707070",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: "7%",
    transform: `translate(-50%, -50%)`,
  }),
  inputSearch: (isRowBased) => ({
    backgroundColor: "#F2F2F2",
    width: "100%",
    border: "none",
    fontSize: isRowBased ? "1vw" : "2vw",
    padding: 0,
    borderRadius: "2em",
    paddingLeft: "3em",
  }),
  hDivider: {
    width: "100%",
    border: "1px solid #F2F2F2",
    margin: "3vh auto",
    height: "1px",
  },
  radioContainer: {
    margin: "3vw auto",
    maxWidth: "100%",
    width: "100%",
  },
  // lstRoutes: (isRowBased) => ({
  //   backgroundColor: "transparent",
  //   border: "none",
  //   fontSize: isRowBased ? "1vw" : "2vw",
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   textAlign: "left",
  //   alignSelf: "center",
  //   height: "4em",
  //   width: "80%",
  // }),
  // btnRadio: isRowBased => ({
  //   minWidth: isRowBased ? "2vw" : "4vw",
  //   minHeight: isRowBased ? "2vw" : "4vw",
  //   width: isRowBased ? "2vw" : "4vw",
  //   height: isRowBased ? "2vw" : "4vw",
  //   backgroundColor: "#00AEEF",
  // }),
  btnContinue: (isRowBased) => ({
    height: "4vh",
    width: "100%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "3vw",
  }),
  txtTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "4vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
  }),
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pane: {
    "& .MuiAutocomplete-input": {
      fontSize: "1vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3vw",
      },
    },
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input":
      {},
  },
  paneTwo: {
    flexGrow: 1,
    backgroundColor: "white",
    "& div": {
      borderBottom: "none !important",
      boxShadow: "none",
    },
    "& fieldset": {
      width: "100%",
    },
    "& label": {
      // fontSize: "1vw",
      // display: "flex",
      // justifyContent: "space-between",
      textAlign: "left",
      alignSelf: "center",
      height: "7em",
      width: "80%",
      justifyContent: "space-between",
      maxWidth: "100%",

      [theme.breakpoints.down("xs")]: {
        height: "4em",
      },
    },
    "& .MuiSvgIcon-root": {
      width: "3vw",
      height: "3vw",
      [theme.breakpoints.down("xs")]: {
        width: "5vw",
        height: "5vw",
      },
    },
    "& .MuiRadio-root": {
      color: "#00AEEF",
    },
    "& .MuiTypography-root": {
      maxWidth: "90%",
      overflowWrap: "anywhere",
      fontSize: "1.15vw",
      fontFamily: "Poppins",
      textAlign: "left",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3vw",
      },
    },
    borderRadius: "1.5vw",
  },
}));

export default MapRoute;
