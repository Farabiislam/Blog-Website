import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/final logo.png";
import Avatar from "../img/avatar.png";
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";

import { useState } from "react";
import "./NavStyle.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  //profile
  const Profile = () => {
    return (
      <div className="profile_modal">
        <ul className="profile_items">
          <li className="name">{currentUser?.username}</li>
          <li
            onClick={() => {
              setProfile(!profile);
            }}
            className="profile_item"
          >
            <Link className="link" to="/write">
              <span className="">📝Write</span>
            </Link>
          </li>
          <li className="profile_item">
            {currentUser ? (
              <span onClick={logout} >Logout</span>
            ) : (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "categories") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link className="nav-link" to={item.path}>
                    {item.title}
                  </Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>

        {/* profile */}
        <div className="profile">
          <img
            onClick={() => {
              setProfile(!profile);
            }}
            className="profile_img"
            src={Avatar}
            alt=""
          />

          {profile && <Profile />}
        </div>

        {/* <div className="links">
          <span>Farabi</span>
          <span>Logout</span>
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
 */}
      </div>
    </div>
  );
};

export default Navbar;
