import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TuneIcon from "@material-ui/icons/Tune";
import { useHistory } from "react-router-dom";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import sun from "@assets/icons/sun.svg";
import sunCloudy from "@assets/icons/sunCloudy.svg";
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

const RideList = (props) => {
  const history = useHistory();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const classes = useStyles();
  const [time, setTime] = React.useState({
    some: true,
    next: false,
  });
  const [start, setStart] = useState({ label: "Munich", value: "" });
  const [end, setEnd] = useState({ label: "Zürich", value: "" });

  const offer = useSelector((state) => {
    return state.offer;
  });

  const Card = ({ onClick, name, weather_status, weather_tem }) => {
    return (
      <div className={`${classes.card} mb-5`} onClick={onClick}>
        <div
          className={`${classes.cardHeader} d-flex flex-row justify-content-between py-1`}
        >
          <div className="d-flex flex-row justify-content-center align-items-center">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3515 28.6637C18.5786 28.8849 18.8864 29.0094 19.2076 29.0094C19.5286 29.0094 19.8364 28.8852 20.0635 28.6637L24.3855 24.447C24.8584 23.9856 24.8584 23.2379 24.3855 22.7765C23.9128 22.3154 23.1461 22.3154 22.6735 22.7765L19.2076 26.1579L17.6273 24.6161C17.1544 24.155 16.388 24.155 15.915 24.6161C15.4424 25.0772 15.4424 25.8252 15.915 26.2866L18.3515 28.6637Z"
                fill="white"
              />
              <path
                d="M20.1497 35.0969C25.4489 35.0969 29.76 30.8906 29.76 25.7206C29.76 20.5507 25.4489 16.3447 20.1497 16.3447C14.8501 16.3447 10.5391 20.5507 10.5391 25.7206C10.5391 30.8906 14.8505 35.0969 20.1497 35.0969ZM20.1497 18.7068C24.1139 18.7068 27.3389 21.8531 27.3389 25.7206C27.3389 29.5881 24.1139 32.7348 20.1497 32.7348C16.1855 32.7348 12.9602 29.5881 12.9602 25.7206C12.9602 21.8531 16.1855 18.7068 20.1497 18.7068Z"
                fill="white"
              />
              <path
                d="M36.2639 3.24835H34.0558V1.91443C34.0558 1.26227 33.5137 0.733398 32.8452 0.733398C32.1767 0.733398 31.6347 1.26227 31.6347 1.91443V3.24835H29.2558V1.91443C29.2558 1.26227 28.7137 0.733398 28.0449 0.733398C27.3764 0.733398 26.8343 1.26227 26.8343 1.91443V3.24835H13.4663V1.91443C13.4663 1.26227 12.9242 0.733398 12.2554 0.733398C11.587 0.733398 11.0449 1.26227 11.0449 1.91443V3.24835H8.66599V1.91443C8.66599 1.26227 8.1239 0.733398 7.45512 0.733398C6.78666 0.733398 6.24457 1.26227 6.24457 1.91443V3.24835H4.03616C1.87749 3.24835 0.121094 4.96191 0.121094 7.06824V36.9138C0.121094 39.0198 1.87749 40.7334 4.03616 40.7334H36.2639C38.4228 40.7334 40.1789 39.0198 40.1789 36.9138V7.06824C40.1789 4.96191 38.4225 3.24835 36.2639 3.24835ZM37.7575 36.9138C37.7575 37.7173 37.0875 38.3713 36.2639 38.3713H4.03616C3.21255 38.3713 2.54221 37.7173 2.54221 36.9138V13.0692H37.7575V36.9138ZM2.54221 7.06824C2.54221 6.2644 3.21255 5.61072 4.03616 5.61072H6.24457V6.94464C6.24457 7.5968 6.78666 8.12567 7.45544 8.12567C8.1239 8.12567 8.66599 7.5968 8.66599 6.94464V5.61072H11.0449V6.94464C11.0449 7.5968 11.587 8.12567 12.2557 8.12567C12.9242 8.12567 13.4663 7.5968 13.4663 6.94464V5.61072H26.8343V6.94464C26.8343 7.5968 27.3764 8.12567 28.0452 8.12567C28.7137 8.12567 29.2558 7.5968 29.2558 6.94464V5.61072H31.6347V6.94464C31.6347 7.5968 32.1767 8.12567 32.8452 8.12567C33.514 8.12567 34.0561 7.5968 34.0561 6.94464V5.61072H36.2639C37.0875 5.61072 37.7578 6.2644 37.7578 7.06824V10.7068H2.54221V7.06824Z"
                fill="white"
              />
            </svg>
            <p className={`${classes.date} ml-2 mb-0`}>12 May 2021</p>
          </div>
          <div
            className={`${classes.weather} d-flex flex-row align-items-center`}
          >
            <img src={weather_status} alt="" />
            <p className={`${classes.weatherText} mb-0`}>{weather_tem}°C</p>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center ml-1">
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.8834 23.0018L20.5851 19.0281V10.9337C20.5851 10.1198 19.9272 9.46191 19.1134 9.46191C18.2995 9.46191 17.6416 10.1198 17.6416 10.9337V19.7641C17.6416 20.2276 17.8594 20.6648 18.2303 20.9415L24.1172 25.3567C24.3821 25.5554 24.6912 25.651 24.9988 25.651C25.4476 25.651 25.8892 25.4494 26.1777 25.0608C26.6664 24.4117 26.5339 23.489 25.8834 23.0018Z"
                fill="white"
              />
              <path
                d="M19.1133 0.645508C8.63604 0.645508 0.113281 9.16827 0.113281 19.6455C0.113281 30.1227 8.63604 38.6455 19.1133 38.6455C29.5905 38.6455 38.1133 30.1227 38.1133 19.6455C38.1133 9.16827 29.5905 0.645508 19.1133 0.645508ZM19.1133 35.7021C10.2608 35.7021 3.05672 28.4979 3.05672 19.6455C3.05672 10.7931 10.2608 3.58895 19.1133 3.58895C27.9672 3.58895 35.1698 10.7931 35.1698 19.6455C35.1698 28.4979 27.9657 35.7021 19.1133 35.7021Z"
                fill="white"
              />
            </svg>

            <p className={`${classes.time} ml-2 mb-0`}>09: 40am</p>
          </div>
        </div>
        <div
          className={`${classes.cardBody} flex-row justify-content-between align-items-center`}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="avatar">
              <img
                src={require("@src/assets/images/card-avatar.png").default}
              ></img>
            </div>
            <p className="align-center mt-1">{name}</p>
            <div className="rating d-flex flex-row justify-content-center align-items-center">
              <Rating
                name="customized-empty"
                defaultValue={4}
                precision={1}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
              <p className="ml-1 mb-0">4.6</p>
            </div>
          </div>
          <div className={`${classes.rideMethod}`}>
            <div className={""}>
              <svg
                width="220"
                height="25"
                viewBox="0 0 220 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M196.098 12.1258C196.098 18.3734 201.163 23.438 207.41 23.438C213.658 23.438 218.723 18.3734 218.723 12.1258C218.723 5.87816 213.658 0.813477 207.41 0.813478C201.163 0.813479 196.098 5.87816 196.098 12.1258Z"
                  fill="#00AEEF"
                />
                <path
                  d="M1.1313 12.1258C1.1313 18.3734 6.19598 23.438 12.4436 23.438C18.6912 23.438 23.7559 18.3734 23.7559 12.1258C23.7559 5.87816 18.6912 0.813477 12.4436 0.813478C6.19598 0.813479 1.1313 5.87816 1.1313 12.1258Z"
                  fill="#00AEEF"
                />
                <path
                  d="M197.469 12.1261C197.469 17.6172 201.92 22.0686 207.411 22.0686C212.902 22.0686 217.354 17.6172 217.354 12.1261C217.354 6.635 212.902 2.18359 207.411 2.1836C201.92 2.1836 197.469 6.63501 197.469 12.1261Z"
                  stroke="#F2F8FF"
                  strokeWidth="4"
                />
                <path
                  d="M2.50171 12.1261C2.50171 17.6172 6.95312 22.0686 12.4442 22.0686C17.9353 22.0686 22.3867 17.6172 22.3867 12.1261C22.3867 6.635 17.9353 2.18359 12.4442 2.1836C6.95312 2.1836 2.50171 6.63501 2.50171 12.1261Z"
                  stroke="#F2F8FF"
                  strokeWidth="4"
                />
                <rect
                  x="205.928"
                  y="10.1855"
                  width="3.88048"
                  height="186.864"
                  transform="rotate(90 205.928 10.1855)"
                  fill="#00AEEF"
                />
              </svg>
              <div className="fromTo d-flex flex-row justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <p className={`${classes.fromText}`}>Navi Mumbai</p>
                  <div className="d-flex flex-row">
                    <Avatar>
                      <DirectionsWalkIcon />
                    </Avatar>
                    <Avatar className={classes.avatarSpace}>
                      <DirectionsWalkIcon />
                    </Avatar>
                    <Avatar className={classes.active}>
                      <DirectionsWalkIcon />
                    </Avatar>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <p className={`${classes.fromText}`}>Pune</p>
                  <div className="d-flex flex-row">
                    <Avatar>
                      <DirectionsWalkIcon />
                    </Avatar>
                    <Avatar className={classes.avatarSpace}>
                      <DirectionsWalkIcon />
                    </Avatar>
                    <Avatar>
                      <DirectionsWalkIcon />
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className={`${classes.ridePrice}`}>Rs.580.00</p>
          </div>
        </div>
      </div>
    );
  };

  const onFilterHandler = () => {
    props.history.push("/ridefilter");
  };

  const onSortHandler = () => {
    props.history.push("/ridesort");
  };

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    if (offer) {
      offer.map((each) => {
        if (each.title === "start") setStart(each.description);
        if (each.title === "end") setEnd(each.description);
        return 0;
      });
    }
    return () => mediaMatch.removeListener(handler);
  });

  return (
    <div className={classes.container}>
      <div
        className={`${classes.ridePanel} my-5 flex-row p-2 align-items-center justify-content-center`}
      >
        <div className="mx-2">
          <svg
            width="45"
            height="46"
            viewBox="0 0 45 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.5014 18.4533C34.5014 27.4011 27.2478 34.6547 18.3 34.6547C9.35223 34.6547 2.09863 27.4011 2.09863 18.4533C2.09863 9.50555 9.35223 2.25195 18.3 2.25195C27.2478 2.25195 34.5014 9.50555 34.5014 18.4533Z"
              stroke="#2E2E2E"
              strokeWidth="3"
              strokeLinecap="square"
            />
            <path
              d="M30.3203 30.4734L43.9367 44.0898"
              stroke="#2E2E2E"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="d-flex flex-column">
          <div
            className={`${classes.rideRoute} d-flex flex-row justify-content-between mt-3`}
          >
            <div className="d-flex flex-column mx-2">
              <p className={classes.rideText}>Mumbai Airport (BOM), Mumbai</p>
            </div>
            <svg
              width="173"
              height="19"
              viewBox="0 0 173 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M171.941 9.89367L160.892 17.9415C160.716 18.0685 160.481 18.1396 160.236 18.1396C159.992 18.1396 159.756 18.0685 159.581 17.9415C159.495 17.8793 159.427 17.8049 159.38 17.7227C159.334 17.6405 159.31 17.5522 159.31 17.4629C159.31 17.3737 159.334 17.2854 159.38 17.2032C159.427 17.121 159.495 17.0466 159.581 16.9844L169.968 9.42008L159.581 1.85574C159.496 1.79355 159.428 1.71925 159.381 1.63721C159.335 1.55517 159.311 1.46705 159.311 1.37803C159.311 1.28901 159.335 1.20089 159.381 1.11885C159.428 1.03682 159.496 0.962517 159.581 0.90033C159.756 0.77326 159.992 0.702154 160.236 0.702154C160.481 0.702154 160.716 0.77326 160.892 0.90033L171.941 8.94813C172.027 9.01034 172.096 9.08475 172.142 9.16694C172.189 9.24913 172.213 9.33744 172.213 9.42666C172.213 9.51588 172.189 9.60419 172.142 9.68638C172.096 9.76857 172.027 9.84297 171.941 9.90518V9.89367Z"
                fill="#2E2E2E"
              />
              <path
                d="M170.782 9.36037L0.0830078 9.36035"
                stroke="#2E2E2E"
                strokeWidth="2"
              />
            </svg>
            <p className={`${classes.rideText} mx-2`}>
              Swargate Bus Stand, Pune
            </p>
          </div>
          <div className={`mx-3`}>
            <p className={classes.passengers}>Today, 2 passengers</p>
          </div>
        </div>
      </div>
      <div
        className={`${classes.listWrapper} d-flex flex-column justify-content-center align-items-center`}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            className={`${classes.dist} d-flex flex-row justify-content-center align-items-center`}
          >
            <p className={`${classes.distText} my-0 px-2`}>{start.label}</p>
            <svg
              width="82"
              height="25"
              viewBox="0 0 82 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0953 12.553C24.0953 6.30535 19.0306 1.24067 12.783 1.24067C6.53538 1.24067 1.4707 6.30536 1.4707 12.553C1.4707 18.8006 6.53538 23.8652 12.783 23.8652C19.0306 23.8652 24.0953 18.8006 24.0953 12.553Z"
                fill="#00AEEF"
              />
              <path
                d="M81.2808 12.553C81.2808 6.30535 76.2161 1.24067 69.9685 1.24067C63.7209 1.24067 58.6562 6.30536 58.6562 12.553C58.6562 18.8006 63.7209 23.8652 69.9685 23.8652C76.2161 23.8652 81.2808 18.8006 81.2808 12.553Z"
                fill="#00AEEF"
              />
              <path
                d="M22.7249 12.5526C22.7249 7.06152 18.2734 2.6101 12.7823 2.61011C7.29125 2.61011 2.83984 7.06152 2.83984 12.5526C2.83984 18.0437 7.29125 22.4951 12.7823 22.4951C18.2734 22.4951 22.7249 18.0437 22.7249 12.5526Z"
                stroke="#F2F8FF"
                strokeWidth="4"
              />
              <path
                d="M79.9104 12.5526C79.9104 7.06152 75.459 2.6101 69.9679 2.61011C64.4768 2.61011 60.0254 7.06152 60.0254 12.5526C60.0254 18.0437 64.4768 22.4951 69.9679 22.4951C75.459 22.4951 79.9104 18.0437 79.9104 12.5526Z"
                stroke="#F2F8FF"
                strokeWidth="4"
              />
              <rect
                x="15.377"
                y="14.4932"
                width="3.88048"
                height="56.6494"
                transform="rotate(-90 15.377 14.4932)"
                fill="#00AEEF"
              />
            </svg>

            <p className={`${classes.distText} px-2 my-0`}>{end.label}</p>
          </div>

          <div className="px-2">
            <p className={`${classes.available} my-2`}>22 rides available</p>
          </div>
        </div>

        <div className="rideList container-lg">
          <div
            className={`${classes.filterPanel} d-flex flex-row justify-content-between pb-2 px-1`}
          >
            <div
              className={`${classes.filter} d-flex flex-row flex-row align-items-center justify-content-center`}
            >
              <p className={`${classes.filterText} mb-0 mr-3`}>Filter</p>
              <Avatar
                variant="rounded"
                className={classes.rounded}
                onClick={onFilterHandler}
              >
                <TuneIcon />
              </Avatar>
            </div>
            <div
              className={`${classes.sort} d-flex flex-row align-items-center justify-content-center`}
            >
              <p className={`${classes.sortText} mb-0 mr-3`}>Sort by rating</p>
              <div className="d-flex flex-column" onClick={onSortHandler}>
                <svg
                  width="30"
                  height="17"
                  viewBox="0 0 30 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.27242 16.3635H27.7266C28.219 16.3635 28.6453 16.1837 29.005 15.8238C29.3645 15.464 29.545 15.0379 29.545 14.5454C29.545 14.053 29.3646 13.6271 29.005 13.2668L16.2779 0.539704C15.9183 0.180299 15.4923 0 14.9995 0C14.5068 0 14.0808 0.180299 13.7209 0.539704L0.993806 13.2668C0.633903 13.6267 0.454102 14.053 0.454102 14.5454C0.454102 15.0378 0.633903 15.464 0.993806 15.8238C1.35411 16.1837 1.78008 16.3635 2.27242 16.3635Z"
                    fill="#00AEEF"
                  />
                </svg>

                <svg
                  width="30"
                  height="17"
                  viewBox="0 0 30 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.7266 0.637207H2.27242C1.77968 0.637207 1.35371 0.817109 0.993806 1.17661C0.633903 1.53651 0.454102 1.96249 0.454102 2.45493C0.454102 2.94737 0.633903 3.37364 0.993806 3.73334L13.7209 16.4603C14.0812 16.8202 14.5072 17.0004 14.9995 17.0004C15.4919 17.0004 15.9183 16.8202 16.2779 16.4603L29.005 3.73324C29.3645 3.37364 29.545 2.94737 29.545 2.45483C29.545 1.96249 29.3646 1.53651 29.005 1.17651C28.6454 0.81671 28.219 0.637207 27.7266 0.637207Z"
                    fill="#00AEEF"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={classes.cardList}>
            <Card
              name={"Rahul"}
              weather_status={sun}
              weather_tem={25}
              onClick={() => history.push("ridequote")}
            />
            <Card
              name={"Rahul"}
              weather_status={sunCloudy}
              weather_tem={25}
              onClick={() => history.push("ridequote")}
            />
            <Card
              name={"Rahul"}
              weather_status={sunCloudy}
              weather_tem={25}
              onClick={() => history.push("ridequote")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {};

const useStyles = makeStyles((theme) => ({
  ridePanel: {
    display: "flex",
    width: "55vw",
    margin: "auto",
    background: "#EEF4FF",
    border: "1px solid #C3D8FF",
    boxSizing: "border-box",
    borderRadius: "71.9429px 71.9429px 71.9px 71.9429px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      display: "block",
      width: "auto",
    },
  },
  rideRoute: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  cardList: {
    padding: "4rem !important",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem !important",
    },
  },
  cardBody: {
    display: "flex",
    padding: "3rem",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      padding: "0rem",
    },
  },
  rideText: {
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#000000",
  },
  passengers: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    fontSize: "20px",
    letterSpacing: "-0.333333px",
    color: "#00AEEF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  distText: {
    fontSize: "30px",
    lineHeight: "37px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    fontWeight: 600,
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  available: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  filterPanel: {
    borderBottom: "2px solid #D5D5D5",
  },
  filter: {},
  filterText: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#00AEEF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  sortText: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#00AEEF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  cardHeader: {
    paddingLeft: "4rem",
    paddingRight: "4rem",
    background: "#00AEEF",
    borderRadius: "38px 38px 0px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  date: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  time: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  fromText: {
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  cardAvatar: {
    backgroundColor: "#c3c3c3",
    borderRadius: "50px 50px 50px 50px",
  },
  avatarSpace: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0.2rem",
      marginRight: "0.2rem",
    },
  },
  ridePrice: {
    fontWeight: 600,
    fontSize: "39px",
    lineHeight: "48px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  card: {
    cursor: "pointer",
    background: "#FFFFFF",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.11)",
    borderRadius: "38px",
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#000000",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
  },
  rideMethod: {
    width: "28%",
    marginLeft: "4rem",
    marginRight: "4rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "2.5rem",
      width: "auto",
    },
  },
  active: {
    background: "#F57F20",
  },
  rounded: {
    background: "transparent",
    border: "2px solid #00AEEF",
    color: "#00AEEF",
  },
  weather: {
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontSize: "20px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginLeft: "0.5rem",
    },
  },
  weatherText: {
    marginLeft: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1rem",
    },
  },
}));

export default RideList;
