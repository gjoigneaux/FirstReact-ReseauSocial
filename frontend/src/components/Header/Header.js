import React from 'react';
import { Link } from "react-router-dom";
import './Header.scss';
import { ReactComponent as Logo } from '../../assets/images/icon-left-font-monochrome-white.svg';
import AuthService from "../../services/auth.service";

function Header() {
  const currentUser = AuthService.getCurrentUser();

  const Logout = () => {
    sessionStorage.removeItem('user');
  }

  if (!currentUser) {
    return (
      <header id="header" className="header">
        <Link id="header_logo" to='/'><Logo id="header_logo_groupomania" alt="logo_groupomania" /></Link>
        <nav id="nav_bar" className="nav_bar">
          <Link id="nav_bar-log" to="/login">Log in</Link>
          <Link id="nav_bar-sign" to="/signup">Sign up</Link>
        </nav>
      </header>
    );
  }
  else {
    return (
      <header id="header" className="header">
        <Link id="header_logo" to='/'><Logo id="header_logo_groupomania" alt="logo_groupomania" /></Link>
        <nav id="nav_bar" className="nav_bar">
          <Link id="nav_bar-log" to={`/user/${currentUser.userId}`}>Profil</Link>
          <Link id="nav_bar-sign" to="/login" onClick={Logout}>Logout</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
