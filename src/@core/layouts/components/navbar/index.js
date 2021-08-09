import React from "react";
import { Link, useHistory } from "react-router-dom";
import { User } from "react-feather";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import defaultAvatar from "@src/assets/images/avatar.png";
import Avatar from "@components/avatar";
const Header = (props) => {
  const history = useHistory();
  return (
    <header>
      <Navbar expand="md header">
        <NavbarBrand href="/">
          <img
            className="logo"
            src={require("@src/assets/images/logo/logo.png").default}
          />
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="/home">
              <svg
                width="46"
                height="45"
                viewBox="0 0 46 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.5346 18.2375C34.5346 27.1853 27.281 34.4389 18.3332 34.4389C9.38543 34.4389 2.13184 27.1853 2.13184 18.2375C2.13184 9.28973 9.38543 2.03613 18.3332 2.03613C27.281 2.03613 34.5346 9.28973 34.5346 18.2375Z"
                  stroke="#00AEEF"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
                <path
                  d="M30.354 30.2578L43.9704 43.8742"
                  stroke="#00AEEF"
                  strokeWidth="3"
                />
              </svg>
              Find a ride
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => history.push("/tourist")}>
              <svg
                width="40"
                height="43"
                viewBox="0 0 40 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.8894 10.0838H28.1573C28.6214 9.76668 29.0573 9.40988 29.4595 9.01778C31.9466 6.52325 32.0281 2.74106 30.4393 1.15227C28.8505 -0.436515 25.0697 -0.356397 22.5724 2.13338C21.5513 3.24485 20.7216 4.51791 20.1173 5.90097C19.513 4.5169 18.6826 3.24315 17.6604 2.13134C15.1659 -0.355718 11.3841 -0.437194 9.79493 1.15159C8.20546 2.74038 8.28762 6.52257 10.775 9.01778C11.1776 9.40988 11.6135 9.76668 12.0773 10.0838H1.34517C0.961209 10.0838 0.649902 10.3951 0.649902 10.779V17.7317C0.649902 18.1156 0.961209 18.4269 1.34517 18.4269H2.73569V38.5896C2.73807 40.5083 4.29325 42.0635 6.21201 42.0659H34.0226C35.9417 42.0635 37.4968 40.5083 37.4989 38.5896V18.4269H38.8894C39.2734 18.4269 39.5847 18.1156 39.5847 17.7317V10.779C39.5847 10.3951 39.2734 10.0838 38.8894 10.0838ZM23.5563 3.11585C25.5545 1.12375 28.4689 1.14684 29.4568 2.13474C30.4447 3.12264 30.4685 6.03575 28.4764 8.03463C27.5642 8.87791 26.5227 9.56944 25.3915 10.0838H21.2369C21.2369 10.0692 21.2369 10.0532 21.2369 10.0386C21.2369 9.88006 21.225 9.71949 21.2097 9.55789C21.204 9.5046 21.1979 9.45164 21.1917 9.39732C21.1758 9.2639 21.1561 9.13082 21.1323 8.99843C21.1249 8.95192 21.1171 8.90507 21.1089 8.85924C21.0756 8.6861 21.0393 8.51568 20.9976 8.35103C20.9921 8.32727 20.9857 8.30656 20.9802 8.28144C20.9432 8.13749 20.9052 8.0034 20.8662 7.86455C20.8608 7.84554 20.8557 7.82483 20.8502 7.80582C21.4199 6.07309 22.3412 4.47616 23.5563 3.11585ZM22.8983 17.0364H17.3362V11.4743H22.8983V17.0364ZM11.7588 8.03531C9.76641 6.03643 9.78983 3.12331 10.7781 2.13474C11.766 1.14616 14.6791 1.12307 16.6766 3.11381C17.9415 4.53082 18.8897 6.20176 19.4577 8.0146C19.5361 8.25869 19.5965 8.49293 19.6535 8.72039C19.6695 8.78557 19.6827 8.84871 19.6967 8.91288C19.7343 9.08262 19.7646 9.24455 19.7873 9.3997C19.7948 9.45232 19.8046 9.50663 19.8107 9.55789C19.8328 9.73137 19.8447 9.90621 19.8464 10.081H14.8431C13.7126 9.56774 12.6714 8.87723 11.7588 8.03531ZM2.04043 11.4743H15.9457V17.0364H2.04043V11.4743ZM4.12622 38.5896V18.4269H17.3362V40.6753H6.21201C5.06014 40.6753 4.12622 39.7414 4.12622 38.5896ZM18.7268 40.6753V18.4269H21.5078V40.6753H18.7268ZM36.1083 38.5896C36.1083 39.7414 35.1748 40.6753 34.0226 40.6753H22.8983V18.4269H36.1083V38.5896ZM38.1941 17.0364H24.2889V11.4743H38.1941V17.0364Z"
                  fill="#00AEEF"
                />
              </svg>
              Tourist Package
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => history.push("/offeride")}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.1642 12.0537H19.7731V20.4001H11.4268V21.7912H19.7731V30.1376H21.1642V21.7912H29.5107V20.4001H21.1642V12.0537Z"
                  fill="#00AEEF"
                />
                <circle
                  cx="19.7733"
                  cy="20.3998"
                  r="17.975"
                  stroke="#00AEEF"
                  strokeWidth="3"
                />
              </svg>
              Offer a ride
            </NavLink>
          </NavItem>
          <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
              href="/"
              tag="a"
              className="nav-link dropdown-user-link"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar
                img={defaultAvatar}
                imgHeight="40"
                imgWidth="40"
                status="online"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag={Link} to="/pages/profile">
                <User size={14} className="mr-75" />
                <span className="align-middle">Profile</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
