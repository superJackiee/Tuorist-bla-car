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

const RideVerify = (props) => {
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

  const btnCloseHandler = () => {
    props.history.push("/ridequote");
  };

  return (
    <div
      className={`${classes.container} d-flex flex-column justify-content-center align-items-center mt-3 pb-5`}
    >
      <div
        className={`${classes.userInfo} d-flex flex-column justify-content-center align-items-center p-3`}
      >
        <div className="avatar mb-1">
          <img
            width={120}
            src={require("@src/assets/images/card-avatar.png").default}
          ></img>
        </div>
        <p className={`${classes.name} mb-0`}>Ramdas</p>
        <p className="">28 Y/o</p>
      </div>
      <div
        className={`${classes.rating} d-flex flex-row justify-content-between align-items-center`}
      >
        <p className="mb-0 mr-1">Ratings</p>
        <Rating
          name="customized-empty"
          defaultValue={4}
          precision={1}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
        <p className="mb-0 ml-1 mr-3">4.9</p>
        <svg
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.56246 6.77243L0.951757 12.2642C0.862711 12.3509 0.74333 12.3994 0.619041 12.3994C0.494751 12.3994 0.375371 12.3509 0.286325 12.2642C0.242688 12.2217 0.208002 12.171 0.184318 12.1149C0.160634 12.0588 0.148437 11.9985 0.148438 11.9376C0.148437 11.8768 0.160634 11.8165 0.184318 11.7604C0.208002 11.7043 0.242688 11.6536 0.286325 11.6111L5.56039 6.44925L0.286325 1.28741C0.24286 1.24497 0.208319 1.19427 0.184737 1.13829C0.161155 1.08231 0.149011 1.02217 0.149011 0.961427C0.149011 0.900681 0.161155 0.840548 0.184737 0.784565C0.208319 0.728583 0.24286 0.677882 0.286325 0.635446C0.375371 0.548736 0.494751 0.500213 0.619041 0.500213C0.74333 0.500213 0.862711 0.548736 0.951757 0.635446L6.56246 6.1272C6.60609 6.16965 6.64078 6.22042 6.66446 6.27651C6.68815 6.3326 6.70034 6.39286 6.70034 6.45374C6.70034 6.51462 6.68815 6.57489 6.66446 6.63097C6.64078 6.68706 6.60609 6.73783 6.56246 6.78028V6.77243Z"
            fill="#2E2E2E"
          />
        </svg>
      </div>
      <div className={`${classes.note} d-flex flex-column`}>
        <div className={`${classes.message} d-flex flex-row mt-3`}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.177 8.44588C10.6373 8.44588 7.78229 10.8694 6.70303 13.9517C6.46538 14.6305 6.39062 15.3736 6.39062 16.1342C6.39062 20.4345 9.87671 23.9205 14.177 23.9205H18.17C18.6228 23.9205 19.0659 23.8797 19.4975 23.8055L21.8488 24.9735C22.4334 25.2639 23.1062 24.7875 23.0266 24.1397L22.811 22.3862C24.7196 20.9672 25.9563 18.6953 25.9563 16.1342C25.9563 11.9062 22.5865 8.46534 18.3862 8.35083L14.177 8.44588Z"
              fill="#2E2E2E"
            />
            <path
              d="M7.94188 0.0595703H11.5238C15.3814 0.0595703 18.5087 3.18678 18.5087 7.04442C18.5087 7.4906 18.4669 7.92702 18.3869 8.34991C17.7755 11.5836 14.9353 13.9802 11.5238 13.9802H7.94184C7.53561 13.9802 7.13821 13.9926 6.75095 13.926L4.64164 14.9738C4.11723 15.2343 3.51365 14.8069 3.58512 14.2258L3.7785 12.6529C2.06649 11.3799 0.957031 9.34188 0.957031 7.04442C0.957031 3.18678 4.08424 0.0595703 7.94188 0.0595703V0.0595703Z"
              fill="#2E2E2E"
            />
            <path
              d="M13.5349 7.69914C14.2887 7.69914 14.8998 7.08803 14.8998 6.33419C14.8998 5.58035 14.2887 4.96924 13.5349 4.96924C12.781 4.96924 12.1699 5.58035 12.1699 6.33419C12.1699 7.08803 12.781 7.69914 13.5349 7.69914Z"
              fill="#EEF4FF"
            />
            <path
              d="M9.73214 7.69914C10.486 7.69914 11.0971 7.08803 11.0971 6.33419C11.0971 5.58035 10.486 4.96924 9.73214 4.96924C8.9783 4.96924 8.36719 5.58035 8.36719 6.33419C8.36719 7.08803 8.9783 7.69914 9.73214 7.69914Z"
              fill="#EEF4FF"
            />
            <path
              d="M5.92941 7.69914C6.68325 7.69914 7.29436 7.08803 7.29436 6.33419C7.29436 5.58035 6.68325 4.96924 5.92941 4.96924C5.17556 4.96924 4.56445 5.58035 4.56445 6.33419C4.56445 7.08803 5.17556 7.69914 5.92941 7.69914Z"
              fill="#EEF4FF"
            />
            <path
              d="M19.9763 17.9138C20.7301 17.9138 21.3412 17.3026 21.3412 16.5488C21.3412 15.795 20.7301 15.1838 19.9763 15.1838C19.2224 15.1838 18.6113 15.795 18.6113 16.5488C18.6113 17.3026 19.2224 17.9138 19.9763 17.9138Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M16.1736 17.9138C16.9274 17.9138 17.5385 17.3026 17.5385 16.5488C17.5385 15.795 16.9274 15.1838 16.1736 15.1838C15.4197 15.1838 14.8086 15.795 14.8086 16.5488C14.8086 17.3026 15.4197 17.9138 16.1736 17.9138Z"
              fill="url(#paint1_linear)"
            />
            <path
              d="M12.3708 17.9138C13.1247 17.9138 13.7358 17.3026 13.7358 16.5488C13.7358 15.795 13.1247 15.1838 12.3708 15.1838C11.617 15.1838 11.0059 15.795 11.0059 16.5488C11.0059 17.3026 11.617 17.9138 12.3708 17.9138Z"
              fill="url(#paint2_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="20.7307"
                y1="15.7944"
                x2="18.793"
                y2="17.732"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="16.928"
                y1="15.7944"
                x2="14.9903"
                y2="17.732"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
              <linearGradient
                id="paint2_linear"
                x1="13.1252"
                y1="15.7944"
                x2="11.1876"
                y2="17.732"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#CFE7FD" />
              </linearGradient>
            </defs>
          </svg>
          <p className="ml-2">I’m chatty when I feel comfortable</p>
        </div>
        <div className={`${classes.smoke} d-flex flex-row mt-2`}>
          <svg
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.40234 11.2151V16.0033H23.6893V11.2151H1.40234ZM6.77094 14.6974H2.70822V12.521H6.77094V14.6974ZM20.0329 14.6974H8.07682V12.521H20.0329V14.6974ZM22.3834 14.6974H21.3387V12.521H22.3834V14.6974Z"
              fill="#2E2E2E"
            />
            <path
              d="M19.7724 6.99273H16.29C15.714 6.99273 15.2453 6.52405 15.2453 5.94802V4.90332H13.9395V5.94802C13.9395 7.24411 14.9939 8.2986 16.29 8.2986H19.7724C20.3484 8.2986 20.8171 8.76728 20.8171 9.34331V10.388H22.123V9.34331C22.123 8.04722 21.0685 6.99273 19.7724 6.99273Z"
              fill="#2E2E2E"
            />
            <path d="M0.564453 0.500977L21.1768 22.4617" stroke="#F50B0B" />
          </svg>

          <p className="ml-2">Please, no smoking in the car</p>
        </div>
        <div className={`${classes.pet} d-flex flex-row my-2`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7223 12.3381C15.8237 10.8844 14.2933 10.0164 12.6285 10.0164C10.9636 10.0164 9.43324 10.8844 8.53484 12.3381L6.36964 15.8409C6.0104 16.422 5.84465 17.0935 5.8902 17.7821C5.93575 18.471 6.1885 19.1124 6.62102 19.6376C7.05385 20.1623 7.62577 20.5209 8.27493 20.6748C8.92409 20.8287 9.58955 20.763 10.1993 20.4851L10.2401 20.4663C11.7742 19.7809 13.5273 19.7872 15.0575 20.4851C15.4523 20.665 15.8705 20.756 16.2925 20.756C16.5219 20.756 16.7527 20.729 16.9814 20.675C17.6306 20.5213 18.2025 20.1626 18.6355 19.6378C19.0681 19.1131 19.321 18.4715 19.3667 17.7825C19.4124 17.0935 19.2467 16.4222 18.8874 15.8407L16.7223 12.3381Z"
              fill="#2E2E2E"
            />
            <path
              d="M6.95318 12.3336C7.59732 12.077 8.08666 11.5387 8.33103 10.8178C8.56367 10.1318 8.54462 9.3573 8.27725 8.63686C8.00973 7.91689 7.52312 7.32916 6.90702 6.98173C6.25984 6.61693 5.54882 6.55752 4.90575 6.81458C3.612 7.33042 3.0183 8.98839 3.58245 10.5113C4.0331 11.7234 5.08416 12.4885 6.14679 12.4885C6.41813 12.4885 6.69023 12.4386 6.95318 12.3336Z"
              fill="#2E2E2E"
            />
            <path
              d="M11.1536 9.58913C12.7709 9.58913 14.0868 8.03449 14.0868 6.12357C14.0868 4.21219 12.7709 2.65723 11.1536 2.65723C9.53639 2.65723 8.2207 4.21219 8.2207 6.12357C8.2207 8.03449 9.53639 9.58913 11.1536 9.58913Z"
              fill="#2E2E2E"
            />
            <path
              d="M16.22 10.4404H16.2201C16.4689 10.5261 16.7227 10.567 16.9755 10.567C18.1549 10.567 19.3044 9.67671 19.743 8.3085C19.9956 7.5209 19.979 6.68813 19.6963 5.96373C19.4004 5.20537 18.8521 4.65493 18.1522 4.41367C17.4522 4.17242 16.6951 4.27306 16.0204 4.69679C15.3758 5.10157 14.8819 5.75834 14.6296 6.54593C14.0971 8.20738 14.8106 9.95446 16.22 10.4404Z"
              fill="#2E2E2E"
            />
            <path
              d="M22.3971 10.0361L22.3967 10.0356C21.2813 9.18121 19.6132 9.55154 18.678 10.8616C17.7436 12.1723 17.8897 13.9344 19.0034 14.7895C19.4095 15.1015 19.8894 15.2506 20.3806 15.2506C21.2367 15.2506 22.1273 14.7975 22.7227 13.9643C23.6569 12.6536 23.5109 10.8915 22.3971 10.0361Z"
              fill="#2E2E2E"
            />
            <path d="M1.13281 0.725586L21.7451 22.6863" stroke="#F50B0B" />
          </svg>

          <p className="ml-2">Sorry not a pet person</p>
        </div>
      </div>
      <div className={`${classes.verifyCard} d-flex flex-column my-3`}>
        <div
          className={`${classes.cardHeader} p-2 d-flex flex-row justify-content-center align-items-center`}
        >
          <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8078 0.774414C6.91016 0.774414 0.484375 7.3838 0.484375 15.5071C0.484375 23.6303 6.91016 30.2397 14.8078 30.2397C22.7054 30.2397 29.1312 23.6303 29.1312 15.5071C29.1312 7.3838 22.7054 0.774414 14.8078 0.774414ZM22.8131 11.63L13.659 20.9718C13.1206 21.5257 12.259 21.5626 11.6846 21.0087L6.83837 16.4671C6.26399 15.9132 6.2281 14.9901 6.73067 14.3993C7.26915 13.8086 8.1666 13.7716 8.74097 14.3255L12.5821 17.944L20.7669 9.52538C21.3413 8.9346 22.2387 8.9346 22.8131 9.52538C23.3875 10.1162 23.3875 11.0393 22.8131 11.63Z"
              fill="#0DB045"
            />
          </svg>
          <p className="mb-0 ml-1">Phone Verified</p>
        </div>
        <div className={`${classes.cardBody} d-flex flex-column my-1`}>
          <p>54 Rides published</p>
          <p>Member since</p>
          <p>March 2021</p>
        </div>
      </div>
      <button
        className="controls form-control"
        style={styles.btnDiv(matches)}
        onClick
      >
        Report this member
      </button>
      <span
        className="material-icons"
        style={styles.icClose(matches)}
        onClick={btnCloseHandler}
      >
        close
      </span>
    </div>
  );
};

const styles = {
  btnDiv: (isRowBased) => ({
    border: "1px solid #00AEEF",
    borderRadius: "35.5px",
    fontWeight: 600,
    fontSize: isRowBased ? "18px" : "10px",
    lineHeight: isRowBased ? "24px" : "16px",
    textAlign: "center",
    letterSpacing: "-0.333333px",
    width: isRowBased ? "20vw" : "30vw",
    color: "#00AEEF",
    height: "auto",
  }),
  icClose: (isRowBased) => ({
    fontSize: isRowBased ? "2vw" : "4vw",
    margin: "0 0.3em",
    color: "#00AEEF",
    position: "absolute",
    zIndex: 100,
    top: "15%",
    left: "25%",
    // transform: `translate(0%, 25%)`,
  }),
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#FFFFFF",
    border: "1px solid #707070",
    boxSizing: "border-box",
    borderRadius: "59px",
    width: "30vw",
    margin: "auto",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      width: "55vw",
      padding: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      padding: "10px",
    },
  },
  name: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.333333px",

    color: "#000000",
  },
  note: {
    borderBottom: "1.5px solid #707070",
  },
  verifyCard: {
    background: "#F5F5F5",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "27px",
    width: "17vw",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  cardHeader: {
    borderBottom: "1.6px solid #D0D0D0",
  },
  family: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "left",
    letterSpacing: "-0.333333px",

    color: "#707070",
  },
  smokePets: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: " -0.333333px",

    color: "#2E2E2E",
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

export default RideVerify;
