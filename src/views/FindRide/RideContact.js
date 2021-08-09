import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import {
//   retrieveTutorials,
//   findTutorialsByTitle,
//   deleteAllTutorials,
// } from "../../redux/actions/offer";

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

const RideContact = (props) => {
  // const [currentTutorial, setCurrentTutorial] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const classes = useStyles();

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  // const tutorials = useSelector(state => state.tutorials);
  // const dispatch = useDispatch();

  // useEffect(() => {
  // dispatch(retrieveTutorials());
  // }, []);

  // const setActiveTutorial = (tutorial, index) => {
  //   setCurrentTutorial(tutorial);
  //   setCurrentIndex(index);
  // };

  const btnCloseHandler = () => {
    props.history.push("/ridequote");
  };

  const btnItemHandler = (idx) => {
    // if (!sure) {
    props.history.push("/ridequote");
  };

  return (
    <div className="list mw-100">
      <div className="text-center" style={styles.leftContainer(matches)}>
        <ThemeProvider theme={theme}>
          <h5 className={""} style={styles.txtTitle(matches)}>
            Your offer will be confirmed by the driver
          </h5>

          <div style={styles.container(matches)}>
            <div className="input-group " style={styles.offerItem(matches)}>
              <button
                className="controls form-control comebackBtn"
                style={styles.btnDiv(matches)}
                onClick={() => btnItemHandler(0)}
              >
                <PhoneInTalkIcon
                  color="primary"
                  style={styles.icBefore(matches)}
                />
                <span>Contact the driver</span>
              </button>
              <span className="material-icons" style={styles.icNext(matches)}>
                navigate_next
              </span>
            </div>

            <div className="" style={styles.hDivider} />

            <div className="input-group " style={styles.offerItem(matches)}>
              <button
                className="controls form-control comebackBtn"
                style={{
                  ...styles.btnDiv(matches),
                  ...styles.btnDivLast(matches),
                }}
                onClick={() => btnItemHandler(1)}
              >
                <SupervisorAccountIcon
                  color="primary"
                  style={styles.icBefore(matches)}
                />
                <span>Check the queue</span>
              </button>
              <span className="material-icons" style={styles.icNext(matches)}>
                navigate_next
              </span>
            </div>
          </div>
        </ThemeProvider>
      </div>

      <span
        className="material-icons"
        style={styles.icClose(matches)}
        onClick={btnCloseHandler}
      >
        close
      </span>

      {/* <svg className="backBubble1" version="1.1">
        <circle cx="380" cy="120" r="200"
          fill="#EEF4FF"/>
      </svg> */}

      <svg className="backBubble2" version="1.1">
        <circle cx="180" cy="490" r="480" fill="rgba(0, 174, 239, 0.44)" />
      </svg>
    </div>
  );
};

const styles = {
  leftContainer: (isRowBased) => ({
    // border: "1px solid #707070",
    // padding: "7%",
    width: isRowBased ? "45vw" : "70vw",
    // height: "40vw" ,
    margin: "14vh auto",
  }),
  txtTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "3.5vw",
    fontWeight: "650",
    letterSpacing: "-0.33px",
    marginBottom: "3vw",
  }),
  icClose: (isRowBased) => ({
    fontSize: isRowBased ? "2vw" : "4vw",
    margin: "0 0.3em",
    color: "#00AEEF",
    position: "absolute",
    zIndex: 100,
    top: isRowBased ? "15%" : "40%",
    left: isRowBased ? "25%" : "2%",
    // transform: `translate(0%, 25%)`,
  }),
  icBefore: (isRowBased) => ({
    fontSize: "3vw",
    margin: "1.5vw 1vw 1.5vw 3vw",
    // color: "#2E2E2E",
    // position: "absolute",
    // zIndex: 100,
    // top: "50%",
    // right: "-2%",
    // transform: `translate(0%, 25%)`,
  }),
  icNext: (isRowBased) => ({
    fontSize: "2.5vw",
    color: "#2E2E2E",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    right: "0%",
    transform: `translate(-50%, -50%)`,
  }),
  hDivider: {
    width: "100%",
    border: "2px solid #D5D5D5",
    margin: "0 auto",
    height: "2px",
  },
  container: (isRowBased) => ({
    border: "1px solid #AAA",
    borderRadius: isRowBased ? "1.5vw" : "3vw",
    backgroundColor: "white",
  }),
  offerItem: (isRowBased) => ({
    // marginBottom: isRowBased ? "1vw" : "2vw",
  }),
  btnDiv: (isRowBased) => ({
    border: "none",
    height: "auto",
    fontSize: isRowBased ? "1.5vw" : "3vw",
    color: "black",
    // borderRadius: 0,
    borderRadius: "3vw",
    textAlign: "left",
    padding: "1em 2.5em",
  }),
  btnDivLast: (isRowBased) => ({
    borderRadius: "3vw",
  }),
};

const useStyles = makeStyles((theme) => ({
  paneTwo: {
    flexGrow: 1,
    backgroundColor: "white",
    "& div": {
      borderBottom: "none !important",
    },
    borderRadius: "1.5vw",
  },
}));

export default RideContact;
