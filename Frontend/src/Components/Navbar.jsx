import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { useAuth } from "../Context/authContext";

function Navbar() {
  const [click, setClick] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleClick = () => {
    setClick(!click);
  };
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    notyf.success("Logout Sucessfully");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navcontainer}>
        <NavLink exact={true.toString()} to="/" className={styles.navlogo}>
          <span>Blogs</span>
          <span className={styles.icon}>
            <CodeIcon />
          </span>
        </NavLink>

        <div className={styles.navicon} onClick={handleClick}>
          {click ? (
            <span className={styles.icon}>
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className={styles.icon}>
              <HamburgetMenuOpen />
            </span>
          )}
        </div>

        <ul
          className={
            click ? `${styles.navmenu} ${styles.active}` : styles.navmenu
          }
        >
          <li className={styles.navitem}>
            <NavLink
              exact={true.toString()}
              to="/"
              activeclassname="active"
              className={styles.navlinks}
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li className={styles.navitem}>
                <NavLink
                  exact={true.toString()}
                  to="/register"
                  activeclassname="active"
                  className={styles.navlinks}
                  onClick={handleClick}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className={styles.navitem}>
                <NavLink
                  exact={true.toString()}
                  to="/login"
                  activeclassname="active"
                  className={styles.navlinks}
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navitem}>
                <NavLink
                  exact={true.toString()}
                  to="/dashboard/user"
                  activeclassname="active"
                  className={styles.navlinks}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className={styles.navitem}>
                <NavLink
                  exact={true.toString()}
                  to="/login"
                  activeclassname="active"
                  className={styles.navlinks}
                  onClick={handlelogout}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
