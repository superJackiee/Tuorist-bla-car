import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   retrieveTutorials,
//   findTutorialsByTitle,
//   deleteAllTutorials,
// } from "../../redux/actions/offer";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Map from "../Map.js";
import { useDispatch, useSelector } from "react-redux";

const ViewMap = (props) => {
  // const [currentTutorial, setCurrentTutorial] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [start, setStart] = useState({ label: "Munich", value: "" });
  const [end, setEnd] = useState({ label: "Zürich", value: "" });
  const [wayList, setWayList] = useState([]);
  const offer = useSelector((state) => {
    return state.offer;
  });

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    if (offer) {
      offer.map((each) => {
        if (each.title === "start") setStart(each.description);
        if (each.title === "end") setEnd(each.description);
        if (each.title === "points") {
          setWayList(each.description);
        }
        return 0;
      });
    }
    // console.log(JSON.stringify(wayList));
    return () => mediaMatch.removeListener(handler);
  });

  const btnContinueHandler = () => {
    props.history.push("/addwaypoint");
  };

  return (
    <div className="list row mw-100">
      <div className={"col-md-6"}>
        <div className="text-center" style={styles.leftContainer(matches)}>
          <h5 className={""} style={styles.txtTitle(matches)}>
            Overview of your city selection
          </h5>

          <div
            className="input-group "
            style={{ marginBottom: matches ? "1vw" : "2vw" }}
          >
            <input
              id="origin-input"
              className="controls form-control"
              type="text"
              placeholder="e.g Manchester picadilly"
              style={styles.inputSearch(matches)}
            />
            <span className="material-icons" style={styles.icSearch(matches)}>
              navigate_before
            </span>
          </div>

          <h5 className={""} style={styles.txtPhase(matches)}>
            These are the best places to stop in those cities. OK for you?
          </h5>

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
                })}
              <TimelineItem style={styles.timelineItemLast(matches)}>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>{end.label}</TimelineContent>
              </TimelineItem>
            </Timeline>
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
        <Map />
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
    height: isRowBased ? "2.5vw" : "8vw",
    fontSize: isRowBased ? "1vw" : "3vw",
    borderRadius: "2em",
    padding: 0,
    paddingLeft: "3em",
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
  txtTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "4vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
    marginBottom: isRowBased ? "3vw" : "6vw",
  }),
  txtPhase: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "4vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
    marginBottom: isRowBased ? "3vw" : "6vw",
    marginTop: isRowBased ? "3vw" : "6vw",
  }),
  timelineContainer: (isRowBased) => ({
    border: "1px solid #C4C4C4",
    padding: "0 4%",
    width: isRowBased ? "25vw" : "50vw",
    // height: isRowBased ? "100vh" : "50vh",
    borderRadius: "2vw",
    margin: isRowBased ? "auto" : "10vh auto",
    marginBottom: isRowBased ? "3vw" : "6vw",
    fontSize: isRowBased ? "1vw" : "3vw",
  }),
  timelineItem: (isRowBased) => ({
    alignSelf: "flex-start",
    minHeight: isRowBased ? "5vw" : "10vw",
  }),
  timelineItemLast: (isRowBased) => ({
    alignSelf: "flex-start",
    minHeight: isRowBased ? "1vw" : "2vw",
  }),
};

export default ViewMap;
