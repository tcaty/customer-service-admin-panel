import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav nav">
        <NavLink exact to="/" activeClassName="selected">
          <span className="nav__item">Создание обращения</span>
        </NavLink>
        <NavLink to="/order-list/" activeClassName="selected">
          <span className="nav__item">Обращения</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;