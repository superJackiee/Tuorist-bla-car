import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
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

const ReturnPickupTime = (props) => {
  // const [currentTutorial, setCurrentTutorial] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());

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

  const btnContinueHandler = () => {
    props.history.push("/anyother");
  };

  return (
    <div className="list mw-100">
      <div className="text-center" style={styles.leftContainer(matches)}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h5 className={""} style={styles.txtTitle(matches)}>
              When are you going
            </h5>

            <form className={classes.calender} noValidate>
              <DatePicker
                autoOk
                disableToolbar
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={setDate}
              />
            </form>

            <h5 className={""} style={styles.txtPhase(matches)}>
              At what time will you pick passengers up?
            </h5>

            <form className={classes.container} noValidate>
              <KeyboardTimePicker
                label=""
                placeholder="08:00"
                mask="__:__"
                ampm={false}
                value={date}
                onChange={setDate}
              />
            </form>

            <button
              className="btn btn-sm"
              style={styles.btnContinue(matches)}
              onClick={btnContinueHandler}
            >
              Continue
            </button>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>

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
    width: isRowBased ? "45vw" : "90vw",

    // height: "40vw" ,
    margin: "8vh auto",
    // borderRadius: "3vw",
    // backgroundColor: "white",
  }),
  btnContinue: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "6.5vw",

    width: "60%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "3vw",
  }),
  txtTitle: (isRowBased) => ({
    fontFamily: "Rubik",
    fontSize: isRowBased ? "2vw" : "4vw",

    fontWeight: "650",
    letterSpacing: "-0.33px",
    marginBottom: "3vw",
  }),
  txtPhase: (isRowBased) => ({
    fontFamily: "Rubik",
    fontSize: isRowBased ? "2vw" : "4vw",

    fontWeight: "650",
    width: "60%",
    textAlign: "center",
    letterSpacing: "-0.33px",
    margin: "3vw auto",
  }),
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "12vw",
    margin: "2vw auto",
    "& .MuiFormControl-root": {
      border: "1px solid black",
      borderRadius: "2vw",
      backgroundColor: "white",
      padding: "0 2vw",
    },
    "& .MuiInputBase-input": {
      fontSize: "2vw",
      fontFamily: "Rubik",
      fontWeight: "650",
    },
    "& .MuiIconButton-root": {
      padding: 0,
      position: "absolute",
      right: 0,
      zIndex: 10,
    },
    "& .MuiSvgIcon-root": {
      width: "1.5vw",
      height: "1.5vw",
    },
  },
  calender: {
    "& .MuiPickersStaticWrapper-staticWrapperRoot": {
      backgroundColor: "transparent",
      minWidth: 0,
      margin: "0 7vw",
    },
    "& .MuiPickersDay-day": {
      width: "3.5vw",
      height: "3.5vw",
      [theme.breakpoints.down("xs")]: {
        width: "7.5vw",
        height: "7.5vw",
      },
    },
    "& .MuiPickersDay-day .MuiTypography-root": {
      fontSize: "1.3vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.5vw",
      },
    },
    "& .MuiPickersCalendarHeader-switchHeader .MuiSvgIcon-root": {
      width: "3vw",
      height: "3vw",
      borderRadius: "50%",
      backgroundColor: "#EEE",
    },
    "& .MuiPickersCalendarHeader-transitionContainer": {
      height: "3vw",
      [theme.breakpoints.down("xs")]: {
        height: "6vw",
      },
    },
    "& .MuiPickersCalendarHeader-switchHeader .MuiTypography-root": {
      fontSize: "2vw",
      fontFamily: "Rubik",
      fontWeight: "650",
      color: "#00AEEF",
      [theme.breakpoints.down("xs")]: {
        fontSize: "4vw",
      },
    },
    "& .MuiPickersCalendarHeader-switchHeader": {
      width: "25vw",
      margin: "auto",
      marginBottom: "2vw",
      [theme.breakpoints.down("xs")]: {
        width: "40vw",
      },
    },
    "& .MuiPickersBasePicker-pickerView": {
      margin: "auto",
      width: "40vw",
      maxWidth: "100vw",
      minWidth: "20vw",
      [theme.breakpoints.down("xs")]: {
        width: "60vw",
        maxWidth: "160vw",
        minWidth: "60vw",
      },
    },
    "& .MuiPickersCalendarHeader-daysHeader": {
      border: "1px solid #2E2E2E",
      borderTopLeftRadius: "2.5vw",
      borderTopRightRadius: "2.5vw",
      margin: 0,
      paddingTop: "3.5vw",
      paddingBottom: "1vw",
      height: "4vw",
      maxHeight: "100vw",
      backgroundColor: "white",
      [theme.breakpoints.down("xs")]: {
        height: "13vw",
        maxHeight: "160vw",
      },
    },
    "& .MuiPickersCalendarHeader-dayLabel": {
      fontSize: "1.3vw",
      fontFamily: "Rubik",
      fontWeight: "650",
      color: "#00AEEF",
      width: "3.5vw",
      height: "3.5vw",
      [theme.breakpoints.down("xs")]: {
        height: "7vw",
        fontSize: "3.5vw",
        width: "7vw",
      },
    },
    "& .MuiPickersCalendar-transitionContainer": {
      border: "1px solid #2E2E2E",
      borderBottomLeftRadius: "2.5vw",
      borderBottomRightRadius: "2.5vw",
      borderTop: "none",
      margin: 0,
      paddingTop: "1vw",
      height: "21vw",
      minHeight: "13vw",
      backgroundColor: "white",
      [theme.breakpoints.down("xs")]: {
        minHeight: "40vw",
      },
    },
  },
}));

export default ReturnPickupTime;
