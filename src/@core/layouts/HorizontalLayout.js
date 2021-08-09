import { useState, useEffect, Fragment } from "react";
import NavbarComponent from "./components/navbar";
import FooterComponent from "./components/footer";

const HorizontalLayout = (props) => {
  const { children } = props;
  const [isMounted, setIsMounted] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true);
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(true);
      }
    });
    return () => cleanup();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Fragment>
      <NavbarComponent />
      <main className="site-space">{children}</main>
      <FooterComponent />
    </Fragment>
  );
};
export default HorizontalLayout;
