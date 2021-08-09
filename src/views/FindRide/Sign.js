import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   retrieveTutorials,
//   findTutorialsByTitle,
//   deleteAllTutorials,
// } from "../../redux/actions/offer";
import PropTypes from "prop-types";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "1.15vw",
    fontFamily: "Poppins",
    marginRight: theme.spacing(1),
    marginTop: "2vw !important",
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const Sign = (props) => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  // const tutorials = useSelector(state => state.tutorials);
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(retrieveTutorials());
  }, []);

  const btnContinueHandler = () => {
    props.history.push("/sign");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="list row mw-100">
      <div className="col-md-6 p-0">
        <div style={styles.leftContainer(matches)}>
          <img
            src={require("@src/assets/images/gyozip.png").default}
            style={styles.boostImg(matches)}
            alt=""
          />
        </div>
      </div>

      <div className="col-md-6 d-flex">
        <ThemeProvider theme={theme}>
          <div className={classes.pane} style={styles.tabContainer}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={handleChange}
              >
                <StyledTab label="Sign up" />
                <StyledTab label="Sign In" />
              </Tabs>
            </Paper>

            <TabPanel value={value} index={0}>
              <div style={styles.leftPan(matches)}>
                <div className="input-group ">
                  <input
                    id="leaving-input"
                    className="controls form-control"
                    type="text"
                    placeholder="User name"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <div className="input-group ">
                  <input
                    id="going-input"
                    className="controls form-control"
                    type="text"
                    placeholder="Email Id"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <div className="input-group ">
                  <input
                    id="going-input"
                    className="controls form-control"
                    type="text"
                    placeholder="Password"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <div className="input-group ">
                  <input
                    id="going-input"
                    className="controls form-control"
                    type="text"
                    placeholder="Password confirm"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <div
                  className=""
                  style={{ ...styles.hDivider, marginBottom: "2em" }}
                />

                <button
                  className="btn btn-sm"
                  style={styles.btnContinue(matches)}
                  onClick={btnContinueHandler}
                >
                  Continue
                </button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div style={styles.leftPan(matches)}>
                <div className="input-group ">
                  <input
                    id="leaving-input"
                    className="controls form-control"
                    type="text"
                    placeholder="Email Id"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <div className="input-group ">
                  <input
                    id="going-input"
                    className="controls form-control"
                    type="text"
                    placeholder="Password"
                    style={styles.inputSearch(matches)}
                  />
                </div>

                <button
                  className="btn btn-sm"
                  style={styles.btnContinue(matches)}
                  onClick={btnContinueHandler}
                >
                  Sign In
                </button>

                <div style={styles.divideContainer(matches)}>
                  <div className="text-center">
                    <span style={styles.txtPhase(matches)}>
                      Already have an account?{" "}
                    </span>
                    <span
                      style={{ ...styles.txtPhase(matches), color: "#00AEEF" }}
                    >
                      Sign in
                    </span>
                  </div>
                  <div className="w-100 d-flex flex-row align-items-center">
                    <div className="" style={styles.hDivider} />
                    <span style={styles.txtPhase(matches)}>Or</span>
                    <div className="" style={styles.hDivider} />
                  </div>
                </div>

                <button
                  className="btn btn-sm"
                  style={{
                    ...styles.btnContinue(matches),
                    ...styles.btnGoogle(matches),
                  }}
                  onClick
                >
                  Continue with Google
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    ...styles.btnContinue(matches),
                    ...styles.btnFacebook(matches),
                  }}
                  onClick
                >
                  Continue with Facebook
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    ...styles.btnContinue(matches),
                    ...styles.btnApple(matches),
                  }}
                  onClick
                >
                  Continue with Apple
                </button>
              </div>
            </TabPanel>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

const styles = {
  leftContainer: (isRowBased) => ({
    width: isRowBased ? "50vw" : "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // height: isRowBased ? `96vh` : "100vh",
    backgroundColor: "#EEEEEE",
    // background: "url('../../assets/images/gyozip.png')",
    margin: `0`,
  }),
  leftPan: (isRowBased) => ({
    border: "1px solid #707070",
    borderRadius: "3vw",
    padding: "7%",
    width: "100%",
    marginTop: 0,
    backgroundColor: "white",
  }),
  inputSearch: (isRowBased) => ({
    backgroundColor: "#F2F2F2",
    border: "none",
    height: isRowBased ? "2.5vw" : "5vw",
    fontSize: isRowBased ? "1vw" : "2vw",
    borderRadius: "2em",
    padding: 0,
    paddingLeft: "1.5em",
    marginBottom: "1.5vw",
  }),
  btnContinue: (isRowBased) => ({
    height: isRowBased ? "2.5vw" : "5vw",
    width: "100%",
    borderRadius: isRowBased ? "3vw" : "6vw",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1vw" : "2vw",
  }),
  divideContainer: (isRowBased) => ({
    marginTop: isRowBased ? "3vw" : "6vw",
    marginBottom: isRowBased ? "1vw" : "2vw",
  }),
  hDivider: {
    width: "100%",
    border: "2px solid #D5D5D5",
    margin: "0 0.5em",
    height: "2px",
  },
  btnGoogle: (isRowBased) => ({
    color: "#2E2E2E",
    backgroundColor: "#FFF",
    border: "1px solid #ED402D",
    marginBottom: isRowBased ? "1.5vw" : "3vw",
  }),
  btnFacebook: (isRowBased) => ({
    color: "#FFF",
    backgroundColor: "#4267B2",
    marginBottom: isRowBased ? "1.5vw" : "3vw",
  }),
  btnApple: (isRowBased) => ({
    color: "#FFF",
    backgroundColor: "#2E2E2E",
    marginBottom: isRowBased ? "1.5vw" : "3vw",
  }),
  txtPhase: (isRowBased) => ({
    fontFamily: "Montserrat",
    fontFamily: "Poppins",
    color: "#2E2E2E",
    fontSize: isRowBased ? "1vw" : "2vw",
    // marginBottom: isRowBased ? "1vw" : "2vw",
  }),
  txtDesc: (isRowBased) => ({
    fontFamily: "Rubik",
    fontSize: "1.15vw",
    fontWeight: "650",
    marginBottom: "2vw",
    marginTop: "1.5vw",
    display: "block",
  }),
  tabContainer: {
    // boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 20%)", //, 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  boostImg: (isRowBased) => ({
    width: "100%",
    // height: isRowBased ? "40vw" : "60vw",
    ObjectFit: "cover",
    alignSelf: "center",
    // aspectRatio: '1/1',
  }),
};

const useStyles = makeStyles((theme) => ({
  pane: {
    flexGrow: 1,
    // backgroundColor: "white",
    padding: "0 10%",
    // borderRadius: "1.5vw",
  },
}));

export default Sign;
