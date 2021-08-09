import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Rating from "@material-ui/lab/Rating";
import GroupIcon from "@material-ui/icons/Group";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
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

const RideFilter = (props) => {
  // const [currentTutorial, setCurrentTutorial] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const classes = useStyles();
  const [price, setPrice] = React.useState("htol");
  const [rating, setRating] = React.useState({
    htol: true,
    ltoh: false,
  });
  const [time, setTime] = React.useState({
    some: true,
    next: false,
  });

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const handleRatingChange = (event) => {
    setRating({
      ...{ htol: false, ltoh: false },
      [event.target.name]: event.target.checked,
    });
  };

  const handleTimeChange = (event) => {
    setTime({
      ...time,
      [event.target.name]: event.target.checked,
    });
  };

  const { htol, ltoh } = rating;
  const { some, next } = time;

  const onPriceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const btnContinueHandler = () => {
    /*
    set dispatch setting
    */
    props.history.push("/ridelist");
  };

  const btnCloseHandler = () => {
    props.history.push("/ridelist");
  };

  return (
    <div className="list mw-100">
      <div className="text-center" style={styles.leftContainer(matches)}>
        <ThemeProvider theme={theme}>
          <h5 className={""} style={styles.txtTitle(matches)}>
            Filter
          </h5>

          <div className={classes.paneTwo} style={styles.radioContainer}>
            <FormControl component="fieldset">
              <div className="" style={styles.hDivider} />
              <h5 className={""} style={styles.txtSubTitle(matches)}>
                Price
              </h5>
              <RadioGroup
                aria-label="price"
                name="price"
                defaultValue="htol"
                value={price}
                onChange={onPriceChangeHandler}
              >
                <FormControlLabel
                  value="htol"
                  control={<Radio color="primary" />}
                  label="High to low"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="ltoh"
                  control={<Radio color="primary" />}
                  label="Low to high"
                  labelPlacement="end"
                />
              </RadioGroup>
              <div className="" style={styles.hDivider} />
              <h5 className={""} style={styles.txtSubTitle(matches)}>
                Departure time
              </h5>
              <FormGroup aria-label="rating">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={htol}
                      onChange={handleRatingChange}
                      name="htol"
                      color="primary"
                    />
                  }
                  label="04:00 - 12:00"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ltoh}
                      onChange={handleRatingChange}
                      name="ltoh"
                      color="primary"
                    />
                  }
                  label="12:01 - 18:00"
                />
              </FormGroup>
              <div className="" style={styles.hDivider} />
              <h5 className={""} style={styles.txtSubTitle(matches)}>
                Amendities
              </h5>
              <FormGroup aria-label="time">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={some}
                      onChange={handleTimeChange}
                      name="some"
                      icon={<GroupIcon />}
                      checkedIcon={<PeopleOutlineIcon />}
                      color="primary"
                    />
                  }
                  label="Max 2 in the back"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={next}
                      onChange={handleTimeChange}
                      icon={
                        <span
                          className="material-icons-outlined"
                          style={styles.icInstant(matches)}
                        >
                          verified
                        </span>
                      }
                      checkedIcon={
                        <span
                          className="material-icons"
                          style={styles.icInstant(matches)}
                        >
                          verified
                        </span>
                      }
                      name="next"
                      color="primary"
                    />
                  }
                  label="Instant approval"
                />
              </FormGroup>
              <div className="" style={styles.hDivider} />
              <h5 className={""} style={styles.txtSubTitle(matches)}>
                Filter by rating
              </h5>
              <Rating
                name="customized-empty"
                defaultValue={2}
                precision={1}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </FormControl>
          </div>

          <button
            className="btn btn-sm"
            style={styles.btnContinue(matches)}
            onClick={btnContinueHandler}
          >
            Filter
          </button>
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
    width: isRowBased ? "45vw" : "90vw",
    // height: "40vw" ,
    margin: "12vh auto",
    // borderRadius: "3vw",
    // backgroundColor: "white",
  }),
  btnContinue: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "6.5vw",
    width: "60%",
    borderRadius: "2em",
    color: "#FFFFFF",
    marginTop: "2vw",
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
  txtSubTitle: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "1.6vw" : "2.9vw",
    fontWeight: "700",
    marginTop: "1vw",
    marginBottom: "1vw",
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
  icInstant: (isRowBased) => ({
    fontSize: "2vw",
    color: "#00AEEF",
  }),
  radioContainer: {
    width: "100%",
    textAlign: "left",
    margin: "auto",
    marginBottom: "2vw",
    padding: "2vw 3vw",
  },
  hDivider: {
    width: "100%",
    border: "2px solid #D5D5D5",
    margin: "2vh auto",
    height: "2px",
  },
};

const useStyles = makeStyles((theme) => ({
  paneTwo: {
    flexGrow: 1,
    backgroundColor: "white",
    "& div": {
      borderBottom: "none !important",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiFormControlLabel-root": {
      justifyContent: "flex-start",
    },
    "& .MuiSvgIcon-root": {
      width: "2vw",
      height: "2vw",
      [theme.breakpoints.down("xs")]: {
        width: "4vw",
        height: "4vw",
      },
    },
    "& .MuiRadio-root": {
      color: "#00AEEF",
    },
    "& .MuiTypography-root": {
      fontSize: "1.15vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.5vw",
      },
      fontFamily: "Poppins",
      textAlign: "left",
    },
    "& .MuiCheckbox-root .MuiSvgIcon-root": {
      fill: "#00AEEF",
    },
    borderRadius: "1.5vw",
  },
}));

export default RideFilter;
