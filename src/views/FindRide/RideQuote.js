import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
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
import TuneIcon from "@material-ui/icons/Tune";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory } from "react-router-dom";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import PetsIcon from "@material-ui/icons/Pets";

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

const RideQuote = (props) => {
  const history = useHistory();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const classes = useStyles();
  const [time, setTime] = React.useState({
    some: true,
    next: false,
  });

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const onAskHandler = () => {
    props.history.push("/ridecontact");
  };

  const onContinueHandler = () => {
    props.history.push("/payment");
  };

  const onMoreHandler = () => {
    props.history.push("/rideverify");
  };
  const onViewMapHandler = () => {
    props.history.push("/findonmap");
  };

  return (
    <div
      className={`${classes.container} d-flex flex-column justify-content-center align-items-center mt-3`}
    >
      <h2 className={classes.title}>Mon, 31 May</h2>
      <div
        className={`${classes.quoteMap} flex-row justify-content-between p-3 mt-2`}
      >
        <div className="quoteInfo d-flex flex-row">
          <svg
            width="26"
            height="157"
            viewBox="0 0 26 157"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9824 132.203L12.9824 1.25559"
              stroke="#F57F20"
              strokeWidth="3"
            />
            <path
              d="M25.0726 13.3465C25.0726 6.66937 19.6597 1.25649 12.9826 1.25649C6.30546 1.25649 0.892577 6.66937 0.892578 13.3465C0.892578 20.0236 6.30546 25.4365 12.9826 25.4365C19.6597 25.4365 25.0726 20.0236 25.0726 13.3465Z"
              fill="white"
            />
            <path
              d="M23.6086 13.3461C23.6086 7.47748 18.8511 2.72003 12.9825 2.72003C7.1139 2.72003 2.35644 7.47748 2.35644 13.3461C2.35645 19.2147 7.1139 23.9722 12.9825 23.9722C18.8511 23.9722 23.6086 19.2147 23.6086 13.3461Z"
              stroke="#F57F20"
              strokeWidth="4"
            />
            <path
              d="M25.0726 144.293C25.0726 137.616 19.6597 132.203 12.9826 132.203C6.30546 132.203 0.892577 137.616 0.892578 144.293C0.892578 150.97 6.30546 156.383 12.9826 156.383C19.6597 156.383 25.0726 150.97 25.0726 144.293Z"
              fill="white"
            />
            <path
              d="M23.6086 144.293C23.6086 138.424 18.8511 133.667 12.9825 133.667C7.1139 133.667 2.35644 138.424 2.35644 144.293C2.35645 150.161 7.1139 154.919 12.9825 154.919C18.8511 154.919 23.6086 150.161 23.6086 144.293Z"
              stroke="#F57F20"
              strokeWidth="4"
            />
          </svg>
          <div className="d-flex flex-column ml-1">
            <span className={`${classes.span}`}>
              Mumbai Airport (BOM), Mumbai
            </span>
            <p className={`${classes.para}`}>Navi Mumbai</p>
            <div className="d-flex flex-row align-items-center mb-2">
              <svg
                width="38"
                height="37"
                viewBox="0 0 38 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18.9655" cy="18.7946" r="18.0651" fill="#F57F20" />
                <path
                  d="M24.4508 21.1093L22.0185 18.4263C21.8671 18.2593 21.7278 17.9151 21.7208 17.6895L21.6313 14.9056V14.8249C21.6313 14.396 21.2822 14.0469 20.8533 14.0469H18.4724H17.5263C17.1429 14.0469 16.7153 14.3184 16.5521 14.6652L13.347 21.4732C13.2583 21.662 13.2495 21.8729 13.3221 22.0677C13.3948 22.2622 13.54 22.4157 13.7306 22.4997L14.2029 22.708C14.3035 22.7523 14.4109 22.7749 14.5222 22.7749C14.8274 22.7749 15.1117 22.6014 15.2468 22.333L16.7482 19.346V22.3483C16.742 22.3657 16.7329 22.3815 16.7272 22.3991L14.1899 30.3452C14.0844 30.6761 14.1165 31.0244 14.2807 31.3258C14.4449 31.6272 14.7198 31.843 15.0554 31.9335L15.225 31.9794C15.336 32.0095 15.4512 32.0248 15.5668 32.0248C16.1507 32.0248 16.681 31.6407 16.8569 31.0903L19.2276 23.6655L20.0685 25.7251C20.2736 26.2274 20.4951 27.1072 20.5521 27.6466L20.9544 31.4386C21.019 32.0458 21.499 32.4864 22.0961 32.4864C22.1939 32.4864 22.2932 32.4745 22.391 32.4509L22.5619 32.4094C23.2424 32.2447 23.7233 31.5455 23.6338 30.8512L23.0381 26.2274C22.9623 25.64 22.7089 24.7201 22.4732 24.1767L21.6687 22.3239C21.6583 22.2998 21.6435 22.278 21.6316 22.2546V20.9991L23.0814 22.5127C23.2256 22.6634 23.4185 22.7464 23.6245 22.7464C23.8327 22.7464 24.0272 22.6618 24.1719 22.5083L24.4401 22.2235C24.727 21.9188 24.7319 21.4193 24.4508 21.1093Z"
                  fill="white"
                />
                <path
                  d="M19.4053 13.3866C20.8359 13.3866 21.9996 12.2229 21.9996 10.7923C21.9996 9.36196 20.8359 8.19824 19.4053 8.19824C17.975 8.19824 16.8115 9.36196 16.8115 10.7923C16.8113 12.2229 17.975 13.3866 19.4053 13.3866Z"
                  fill="white"
                />
              </svg>
              <p
                className={`${classes.para} mb-0 ml-1`}
                style={styles.paraColor1(matches)}
              >
                11 km from your arrival
              </p>
            </div>
            <span className={`${classes.span}`}>Swargate Bus Stand, Pune </span>
            <p className={`${classes.para}`}>Pune</p>
            <div className="d-flex flex-row align-items-center">
              <svg
                width="38"
                height="37"
                viewBox="0 0 38 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18.9655" cy="18.1959" r="18.0651" fill="#F7D458" />
                <path
                  d="M24.4508 20.5107L22.0185 17.8277C21.8671 17.6607 21.7278 17.3165 21.7208 17.0909L21.6313 14.307V14.2263C21.6313 13.7973 21.2822 13.4482 20.8533 13.4482H18.4724H17.5263C17.1429 13.4482 16.7153 13.7198 16.5521 14.0665L13.347 20.8746C13.2583 21.0634 13.2495 21.2742 13.3221 21.469C13.3948 21.6635 13.54 21.8171 13.7306 21.9011L14.2029 22.1094C14.3035 22.1537 14.4109 22.1763 14.5222 22.1763C14.8274 22.1763 15.1117 22.0028 15.2468 21.7343L16.7482 18.7474V21.7496C16.742 21.767 16.7329 21.7828 16.7272 21.8005L14.1899 29.7466C14.0844 30.0775 14.1165 30.4258 14.2807 30.7272C14.4449 31.0285 14.7198 31.2443 15.0554 31.3348L15.225 31.3808C15.336 31.4108 15.4512 31.4261 15.5668 31.4261C16.1507 31.4261 16.681 31.042 16.8569 30.4917L19.2276 23.0669L20.0685 25.1264C20.2736 25.6288 20.4951 26.5085 20.5521 27.048L20.9544 30.84C21.019 31.4471 21.499 31.8878 22.0961 31.8878C22.1939 31.8878 22.2932 31.8759 22.391 31.8523L22.5619 31.8108C23.2424 31.6461 23.7233 30.9468 23.6338 30.2526L23.0381 25.6288C22.9623 25.0414 22.7089 24.1214 22.4732 23.5781L21.6687 21.7253C21.6583 21.7011 21.6435 21.6794 21.6316 21.656V20.4005L23.0814 21.9141C23.2256 22.0648 23.4185 22.1477 23.6245 22.1477C23.8327 22.1477 24.0272 22.0632 24.1719 21.9097L24.4401 21.6249C24.727 21.3202 24.7319 20.8206 24.4508 20.5107Z"
                  fill="white"
                />
                <path
                  d="M19.4053 12.788C20.8359 12.788 21.9996 11.6243 21.9996 10.1937C21.9996 8.76333 20.8359 7.59961 19.4053 7.59961C17.975 7.59961 16.8115 8.76333 16.8115 10.1937C16.8113 11.6243 17.975 12.788 19.4053 12.788Z"
                  fill="white"
                />
              </svg>
              <p
                className={`${classes.span} mb-0 ml-1`}
                style={styles.paraColor2(matches)}
              >
                19 Km from your departure
              </p>
            </div>
          </div>
        </div>
        <div className="viewMap d-flex flex-column justify-content-between">
          <button
            className="controls form-control"
            style={styles.btnDiv(matches)}
            onClick={onViewMapHandler}
          >
            View map
          </button>
          <button
            className={`${classes.mapBtn} controls form-control`}
            style={styles.btnDiv(matches)}
            onClick={onViewMapHandler}
          >
            View map
          </button>
        </div>
      </div>
      <div
        className={`${classes.totalPrice} d-flex flex-column py-2 px-5 my-3 align-items-center justify-content-center`}
      >
        <p className={`${classes.passanger}`}>Total price for 2 passangers</p>
        <p className={`${classes.price}`}>Rs.500.00</p>
      </div>
      <div className={`${classes.quoteDetails} p-3`}>
        <div className="quoteAvatar d-flex flex-row justify-content-between justify-content-center align-items-center mb-3">
          <div className="avatarInfo d-flex justify-content-center align-items-center">
            <div className="avatar mr-2">
              <img
                width={80}
                src={require("@src/assets/images/card-avatar.png").default}
              ></img>
            </div>
            <div className="d-flex flex-column">
              <p className={classes.rating}>Rahul</p>
              <Rating
                name="customized-empty"
                defaultValue={4}
                precision={1}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
              4.6
            </div>
          </div>

          <button
            className="controls form-control"
            style={styles.btnDiv(matches)}
            onClick={onMoreHandler}
          >
            More
          </button>
        </div>
        <div className="quoteFamily my-2">
          <p className={classes.family}>
            family member more then 2 seat then book otherwise no book
          </p>
        </div>
        <div
          className={`${classes.quoteQuestion} d-flex flex-row align-items-center mb-2 pb-1`}
          onClick={onAskHandler}
        >
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.9335 16.2921C18.4289 16.2921 13.1824 20.7456 11.1991 26.4099C10.7624 27.6572 10.625 29.0228 10.625 30.4206C10.625 38.3229 17.0312 44.7291 24.9335 44.7291H32.2714C33.1035 44.7291 33.9177 44.6541 34.7108 44.5177L39.0318 46.664C40.106 47.1977 41.3424 46.3223 41.196 45.1318L40.7999 41.9096C44.3072 39.3018 46.5799 35.1269 46.5799 30.4206C46.5799 22.651 40.3873 16.3279 32.6686 16.1174L24.9335 16.2921Z"
              fill="#00AEEF"
            />
            <path
              d="M13.4724 0.881836H20.0548C27.1437 0.881836 32.8905 6.62854 32.8905 13.7175C32.8905 14.5375 32.8137 15.3395 32.6667 16.1166C31.5432 22.0589 26.3238 26.4631 20.0548 26.4631H13.4723C12.7258 26.4631 11.9956 26.4859 11.2839 26.3635L7.40774 28.2889C6.44405 28.7676 5.33489 27.9823 5.46622 26.9144L5.82159 24.0239C2.67552 21.6847 0.636719 17.9395 0.636719 13.7175C0.636719 6.62854 6.38343 0.881836 13.4724 0.881836V0.881836Z"
              fill="#00AEEF"
            />
            <path
              d="M23.7505 14.9189C25.1358 14.9189 26.2588 13.7959 26.2588 12.4106C26.2588 11.0253 25.1358 9.90234 23.7505 9.90234C22.3652 9.90234 21.2422 11.0253 21.2422 12.4106C21.2422 13.7959 22.3652 14.9189 23.7505 14.9189Z"
              fill="#EEF4FF"
            />
            <path
              d="M16.7622 14.9189C18.1475 14.9189 19.2705 13.7959 19.2705 12.4106C19.2705 11.0253 18.1475 9.90234 16.7622 9.90234C15.3769 9.90234 14.2539 11.0253 14.2539 12.4106C14.2539 13.7959 15.3769 14.9189 16.7622 14.9189Z"
              fill="#EEF4FF"
            />
            <path
              d="M9.77393 14.9197C11.1592 14.9197 12.2822 13.7967 12.2822 12.4114C12.2822 11.0261 11.1592 9.90308 9.77393 9.90308C8.38863 9.90308 7.26562 11.0261 7.26562 12.4114C7.26562 13.7967 8.38863 14.9197 9.77393 14.9197Z"
              fill="#EEF4FF"
            />
            <path
              d="M35.5864 33.6912C36.9717 33.6912 38.0947 32.5682 38.0947 31.1829C38.0947 29.7976 36.9717 28.6746 35.5864 28.6746C34.2011 28.6746 33.0781 29.7976 33.0781 31.1829C33.0781 32.5682 34.2011 33.6912 35.5864 33.6912Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M28.5982 33.6912C29.9835 33.6912 31.1065 32.5682 31.1065 31.1829C31.1065 29.7976 29.9835 28.6746 28.5982 28.6746C27.2129 28.6746 26.0898 29.7976 26.0898 31.1829C26.0898 32.5682 27.2129 33.6912 28.5982 33.6912Z"
              fill="url(#paint1_linear)"
            />
            <path
              d="M21.6108 33.6909C22.9961 33.6909 24.1192 32.5679 24.1192 31.1826C24.1192 29.7973 22.9961 28.6743 21.6108 28.6743C20.2255 28.6743 19.1025 29.7973 19.1025 31.1826C19.1025 32.5679 20.2255 33.6909 21.6108 33.6909Z"
              fill="url(#paint2_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="36.9728"
                y1="29.7965"
                x2="33.412"
                y2="33.3572"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EEF4FF" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="29.9845"
                y1="29.7965"
                x2="26.4238"
                y2="33.3573"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EEF4FF" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
              <linearGradient
                id="paint2_linear"
                x1="22.9972"
                y1="29.7963"
                x2="19.4365"
                y2="33.357"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EEF4FF" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
            </defs>
          </svg>

          <p className={`${classes.question} ml-2`}>Ask a question</p>
        </div>
        <div className="quoteForbidden d-flex flex-column mb-2">
          <div className="d-flex flex-row align-items-center">
            <svg
              width="47"
              height="45"
              viewBox="0 0 47 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.89648 21.9868V31.2761H46.134V21.9868H2.89648ZM13.3117 28.7427H5.42993V24.5203H13.3117V28.7427ZM39.0403 28.7427H15.8452V24.5203H39.0403V28.7427ZM43.6005 28.7427H41.5738V24.5203H43.6005V28.7427Z"
                fill="#2E2E2E"
              />
              <path
                d="M38.5348 13.7957H31.779C30.6615 13.7957 29.7522 12.8865 29.7522 11.7689V9.74219H27.2188V11.7689C27.2188 14.2834 29.2645 16.3292 31.779 16.3292H38.5348C39.6523 16.3292 40.5616 17.2384 40.5616 18.3559V20.3827H43.095V18.3559C43.095 15.8415 41.0493 13.7957 38.5348 13.7957Z"
                fill="#2E2E2E"
              />
              <path d="M1.26562 1.20117L41.2542 43.8057" stroke="#F50B0B" />
            </svg>

            <p className={`${classes.smokePets} ml-2`}>
              Please, no smoking in the car
            </p>
          </div>
          <div className="d-flex flex-row align-items-center">
            <svg
              width="45"
              height="44"
              viewBox="0 0 45 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.4371 23.5764C29.6939 20.7562 26.7249 19.0723 23.495 19.0723C20.2651 19.0723 17.2962 20.7562 15.5532 23.5764L11.3527 30.3721C10.6557 31.4994 10.3342 32.8021 10.4225 34.1382C10.5109 35.4745 11.0012 36.719 11.8404 37.7378C12.68 38.7557 13.7896 39.4515 15.049 39.7501C16.3084 40.0486 17.5994 39.9211 18.7823 39.3819L18.8615 39.3455C21.8378 38.0158 25.2388 38.0281 28.2075 39.3819C28.9733 39.7311 29.7846 39.9076 30.6033 39.9076C31.0484 39.9076 31.4962 39.8552 31.9398 39.7504C33.1992 39.4521 34.3088 38.7564 35.1488 37.7381C35.9882 36.7202 36.4788 35.4755 36.5675 34.1388C36.6562 32.8021 36.3346 31.4997 35.6376 30.3718L31.4371 23.5764Z"
                fill="#2E2E2E"
              />
              <path
                d="M12.4844 23.5672C13.7341 23.0694 14.6834 22.0252 15.1575 20.6265C15.6088 19.2957 15.5719 17.7932 15.0532 16.3955C14.5341 14.9987 13.5901 13.8585 12.3949 13.1845C11.1393 12.4767 9.75991 12.3615 8.51233 12.8602C6.00241 13.8609 4.8506 17.0775 5.94507 20.0319C6.81935 22.3835 8.85844 23.8679 10.92 23.8679C11.4464 23.8679 11.9743 23.771 12.4844 23.5672Z"
                fill="#2E2E2E"
              />
              <path
                d="M20.6333 18.2431C23.771 18.2431 26.3237 15.227 26.3237 11.5198C26.3237 7.8116 23.771 4.79492 20.6333 4.79492C17.4958 4.79492 14.9434 7.8116 14.9434 11.5198C14.9434 15.227 17.4958 18.2431 20.6333 18.2431Z"
                fill="#2E2E2E"
              />
              <path
                d="M30.4619 19.8946H30.4622C30.9448 20.0607 31.4373 20.1401 31.9276 20.1401C34.2158 20.1401 36.4459 18.4129 37.2968 15.7585C37.7868 14.2306 37.7546 12.615 37.2061 11.2096C36.6321 9.73837 35.5683 8.67049 34.2105 8.20245C32.8524 7.73441 31.3838 7.92966 30.0747 8.75172C28.8242 9.537 27.866 10.8112 27.3765 12.3391C26.3435 15.5624 27.7276 18.9518 30.4619 19.8946Z"
                fill="#2E2E2E"
              />
              <path
                d="M42.4464 19.1093L42.4455 19.1084C40.2817 17.4508 37.0456 18.1692 35.2311 20.7108C33.4184 23.2536 33.7019 26.6721 35.8624 28.331C36.6504 28.9363 37.5814 29.2257 38.5343 29.2257C40.1951 29.2257 41.923 28.3466 43.078 26.7301C44.8904 24.1873 44.6073 20.7688 42.4464 19.1093Z"
                fill="#2E2E2E"
              />
              <path d="M1.18945 1.04883L41.178 43.6533" stroke="#F50B0B" />
            </svg>

            <p className={`${classes.smokePets} ml-2`}>
              Sorry not a pet person
            </p>
          </div>
        </div>
      </div>
      <button
        className={`${classes.continue} controls form-control mt-3`}
        style={styles.btnContinue(matches)}
        onClick={onContinueHandler}
      >
        Continue
      </button>
    </div>
  );
};

const styles = {
  btnDiv: (isRowBased) => ({
    border: "none",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#FFFFFF",
    borderRadius: "5vw",
    padding: "1em 2.5em",
    width: "183.4px",
    height: "54.74px",
    background: "#00AEEF",
    borderRadius: "27.3697px",
    marginTop: isRowBased ? "0px" : "20px",
  }),
  btnContinue: (isRowBased) => ({
    border: "none",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#FFFFFF",
    // borderRadius: 0,
    borderRadius: "5vw",
    padding: "1em 2.5em",
    width: isRowBased ? "400px" : "300px",
    height: "54.74px",
    background: "#00AEEF",
    borderRadius: "27.3697px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  }),
  paraColor1: (isRowBased) => ({
    color: "#F57F20",
  }),
  paraColor2: (isRowBased) => ({
    color: "#F5C620",
  }),
};

const useStyles = makeStyles((theme) => ({
  container: {},
  title: {
    fontWeight: 600,
    fontSize: "35px",
    lineHeight: "43px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    color: "#000000",
  },
  span: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "18px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom: 5,
      lineHeight: "14px",
    },
  },
  para: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "14px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  quoteMap: {
    display: "flex",
    background: "#FFFFFF",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.11)",
    borderRadius: "38px",
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "auto",
    },
  },
  mapBtn: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  totalPrice: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.11)",
    borderRadius: 38,
  },
  price: {
    fontWeight: 600,
    fontSize: "35px",
    lineHeight: "43px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#F57F20",
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px",
    },
  },
  passanger: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#707070",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },
  quoteDetails: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.11)",
    borderRadius: "38px",
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      width: "55vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "99%",
    },
  },
  quoteQuestion: {
    borderBottom: "1px solid #D5D5D5;",
  },
  question: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#00AEEF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },
  family: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "left",
    letterSpacing: "-0.333333px",

    color: "#707070",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },
  smokePets: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: " -0.333333px",

    color: "#2E2E2E",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },
  continue: {
    width: "200px",
  },
  rating: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: " -0.333333px",

    color: "#000000",
  },
}));

export default RideQuote;
