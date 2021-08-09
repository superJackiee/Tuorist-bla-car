import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  placeHttpRequest,
  googleAPIKey,
  placeDetailHttpRequest,
} from "../../http-common";
import { updateTutorialsByTitle } from "../../redux/actions/offer";

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

const AddWayPoint = (props) => {
  const classes = useStyles();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [startId, setStartId] = useState({});
  const [startLabel, setStartLabel] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [addedPlaces, setAddedPlaces] = useState([]);
  const [placeLatLngList, setPlaceLatLngList] = useState([]);
  const [time, setTime] = useState({});
  const [curRouteIdx, setCurRouteIdx] = useState(0);
  const [routePathList, setRoutePathList] = useState([]);
  const [ready, setReady] = useState(false);

  const [wayList, setWayList] = useState([]);
  const offer = useSelector((state) => {
    return state.offer;
  });

  const [start, setStart] = useState({ label: "Munich", value: "" });
  const [end, setEnd] = useState({ label: "Zürich", value: "" });
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (routePathList.length === 0) return;
    const onLoad = () => {
      setReady(true);
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=geometry`;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [curRouteIdx, routePathList]);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    if (offer && initialized === false) {
      offer.map((each) => {
        if (each.title === "start") setStart(each.description);
        if (each.title === "end") setEnd(each.description);
        if (each.title === "route") setCurRouteIdx(each.description);
        if (each.title === "paths") setRoutePathList(each.description);
        if (each.title === "points") {
          let timeList = {};
          setAddedPlaces(addedPlaces.concat(each.description));
          each.description.map((place, index) => {
            timeList = { ...timeList, [index]: true };
            setTime(timeList);
            return 0;
          });
        }
        if (each.title === "latlngs") {
          setPlaceLatLngList(placeLatLngList.concat(each.description));
        }
        return 0;
      });
      setInitialized(true);
    }
    return () => mediaMatch.removeListener(handler);
  });

  const onStartIdChanged = (event, newId) => {
    setStartId(newId);
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

  const handleTimeChange = (event) => {
    setTime({
      ...time,
      [event.target.name]: event.target.checked,
    });
  };

  const btnContinueHandler = () => {
    props.history.push("/pickuptime");
  };

  const btnAddHandler = () => {
    if (startId) {
      for (const place of addedPlaces) {
        if (startId.label === place.label) return;
      }
      if (startId.label === start.label) return;
      if (startId.label === end.label) return;
      return placeDetailHttpRequest
        .get(`/json?place_id=${startId.value}&key=${googleAPIKey}`)
        .then((response) => {
          if (`${response.data.status}` !== "OK") {
            alert("Could not get the city detail. Try again");
            return;
          }
          const pos = response.data.results[0].geometry.location;
          const curPath = routePathList[curRouteIdx];
          const myPosition = new window.google.maps.LatLng(pos);
          // const cascadiaFault = new window.google.maps.Polyline(curPath);
          if (
            window.google.maps.geometry.poly.isLocationOnEdge(
              myPosition,
              // cascadiaFault,
              curPath,
              10e-1
            )
          ) {
            // alert("Relocate!");
          } else {
            alert("Sorry, the city is not on the route.");
            return;
          }

          setPlaceLatLngList(placeLatLngList.concat(myPosition));
          setAddedPlaces(addedPlaces.concat(startId));
          setTime({ ...time, [addedPlaces.length]: false });
        });
    }
  };

  useEffect(() => {
    if (!time || time.length === 0) return;
    const wayPointsList = [],
      latLngList = [];
    addedPlaces.map((place, index) => {
      if (time[index]) {
        wayPointsList.push(place);
        latLngList.push(placeLatLngList[index]);
      }
    });
    dispatch(updateTutorialsByTitle("latlngs", latLngList));
    dispatch(updateTutorialsByTitle("points", wayPointsList));
  }, [time]);

  const btnViewMapHandler = () => {
    props.history.push("/viewmap");
  };

  return (
    <div className="list row mw-100">
      <div className={"col-md-6"}>
        <div className="text-center" style={styles.leftContainer(matches)}>
          <h5 className={""} style={styles.txtTitle(matches)}>
            Where do you prefer to meet extra passengers?
          </h5>

          <p className={""} style={styles.txtPhase(matches)}>
            Get more with our Boost technology
            <br />
            Add your preferred stopovers to help Boost find extra passengers on
            your way.
          </p>

          <button
            className="btn btn-sm"
            style={styles.btnAddCity(matches)}
            onClick={btnAddHandler}
          >
            Add city
          </button>

          <div
            className="input-group "
            style={{ marginBottom: matches ? "1vw" : "2vw" }}
          >
            <ThemeProvider theme={theme}>
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
                    <TextField {...params} label="" variant="outlined" />
                  )}
                />
              </div>
            </ThemeProvider>
            <span className="material-icons" style={styles.icSearch(matches)}>
              navigate_before
            </span>
          </div>

          <div className={classes.paneTwo} style={styles.radioContainer}>
            <FormGroup aria-label="time">
              {addedPlaces &&
                addedPlaces.map((city, index) => {
                  return (
                    <div key={index}>
                      <div className={classes.paneExpand}>
                        <div className="" style={styles.hDivider} />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={time[index]}
                              onChange={handleTimeChange}
                              name={`${index}`}
                              color="primary"
                            />
                          }
                          label={city.label}
                          labelPlacement="start"
                        />
                      </div>
                    </div>
                  );
                })}
            </FormGroup>
          </div>

          <button
            className="btn btn-sm"
            style={styles.btnContinue(matches)}
            onClick={btnContinueHandler}
          >
            Continue
          </button>
        </div>
      </div>

      <div className="col-md-6 p-0">
        <div
          className="d-flex justify-content-around"
          style={styles.rightContainer(matches)}
        >
          <div style={styles.timelineContainer(matches)}>
            <Timeline>
              <TimelineItem style={styles.timelineItem(matches)}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{start.label}</TimelineContent>
              </TimelineItem>

              {wayList &&
                wayList.map((place, index) => {
                  if (time[index]) {
                    return (
                      <TimelineItem
                        style={styles.timelineItem(matches)}
                        key={index}
                      >
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>{place.label}</TimelineContent>
                      </TimelineItem>
                    );
                  } else {
                    return <div key={index}></div>;
                  }
                })}
              {addedPlaces &&
                addedPlaces.map((place, index) => {
                  if (time[index]) {
                    return (
                      <TimelineItem
                        style={styles.timelineItem(matches)}
                        key={index}
                      >
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>{place.label}</TimelineContent>
                      </TimelineItem>
                    );
                  } else {
                    return <div key={index}></div>;
                  }
                })}
              <TimelineItem style={styles.timelineItem(matches)}>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>{end.label}</TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-sm"
              style={styles.btnViewMap(matches)}
              onClick={btnViewMapHandler}
            >
              View map
            </button>
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
    border: "1px solid #707070",
    padding: "7%",
    width: isRowBased ? "35vw" : "70vw",
    // height: isRowBased ? "40vw" : "80vw",
    marginRight: isRowBased ? "0" : "auto",
    marginLeft: "auto",
    marginTop: isRowBased ? "12vh" : "12vh",
    marginBottom: isRowBased ? "12vh" : "12vh",
    borderRadius: "3vw",
    backgroundColor: "white",
  }),
  rightContainer: (isRowBased) => ({
    border: "1px solid #C4C4C4",
    padding: "0 4%",
    width: isRowBased ? "25vw" : "57vw",
    // height: isRowBased ? "100vh" : "50vh",
    borderRadius: "2vw",
    margin: isRowBased ? "auto" : "10vh auto",
    marginTop: isRowBased ? "12vh" : "12vh",
    backgroundColor: "white",
  }),
  icSearch: (isRowBased) => ({
    fontSize: isRowBased ? "2vw" : "4vw",
    color: "#707070",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: "7%",
    transform: `translate(-50%, -50%)`,
  }),
  inputSearch: (isRowBased) => ({
    backgroundColor: "#F2F2F2",
    border: "none",
    fontSize: isRowBased ? "1vw" : "2vw",
    borderRadius: "2em",
    padding: 0,
    paddingLeft: "3em",
  }),
  hDivider: {
    width: "100%",
    border: "1px solid #707070",
    margin: "0vh auto",
    height: "1px",
  },
  lstContainer: {
    marginBottom: "1vw",
  },
  lstRoutes: (isRowBased) => ({
    backgroundColor: "transparent",
    border: "none",
    fontSize: isRowBased ? "1vw" : "2vw",
    display: "flex",
    color: "black",
    margin: 0,
    fontFamily: "Poppins",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    alignSelf: "center",
    height: "3em",
    width: "80%",
    padding: 0,
  }),
  btnRadio: (isRowBased) => ({
    minWidth: isRowBased ? "1.5vw" : "3vw",
    minHeight: isRowBased ? "1.5vw" : "3vw",
    width: isRowBased ? "1.5vw" : "3vw",
    height: isRowBased ? "1.5vw" : "3vw",
    border: "1px solid #00AEEF",
    borderRadius: "50%",
    // backgroundColor: '#00AEEF',
    WebkitAppearance: "none",
    outline: "none",
    cursor: "pointer",
  }),
  btnContinue: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "8vw",
    width: "100%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "3vw",
  }),
  btnAddCity: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "5vw",
    width: "30%",
    alignSelf: "center",
    borderRadius: "2em",
    color: "#000000",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "2vw",
    marginBottom: isRowBased ? "3vw" : "6vw",
  }),
  btnViewMap: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "7vw",
    width: "100%",
    alignSelf: "center",
    borderRadius: "2em",
    color: "#FFF",
    padding: "0 0.8rem",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "3vw",
    // marginBottom: isRowBased ? "3vw" : "6vw",
  }),
  txtTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "5vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
  }),
  txtPhase: (isRowBased) => ({
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "4vw",
  }),
  timelineContainer: (isRowBased) => ({
    marginTop: "2vw",
    marginLeft: "-2rem",
    fontSize: isRowBased ? "1vw" : "3vw",
  }),
  timelineItem: (isRowBased) => ({
    alignSelf: "flex-start",
    minHeight: isRowBased ? "5vw" : "10vw",
  }),
};

const useStyles = makeStyles((theme) => ({
  pane: {
    "& .MuiAutocomplete-input": {
      fontSize: "1vw",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3vw",
      },
    },
  },
  paneTwo: {
    flexGrow: 1,
    backgroundColor: "white",
    "& div": {
      borderBottom: "none !important",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiSvgIcon-root": {
      width: "2vw",
      height: "2vw",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        width: "4vw",
        height: "4vw",
      },
    },
    "& .MuiRadio-root": {
      color: "#00AEEF",
    },
    "& .MuiTypography-root": {
      fontSize: "1.15vw",
      fontFamily: "Poppins",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3vw",
      },
    },
    "& .MuiCheckbox-root .MuiSvgIcon-root": {
      fill: "#00AEEF",
    },
    borderRadius: "1.5vw",
  },
  paneExpand: {
    "& .MuiFormControlLabel-root": {
      justifyContent: "space-between",
      width: "100%",
    },
  },
}));
export default AddWayPoint;
