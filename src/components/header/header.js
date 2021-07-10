import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav nav">
        <Link to="/">
          <span className="nav__item">Создание обращения</span>
        </Link>
        <span className="nav__item">Обращения</span>
      </nav>
    </header>
  );
};

export default Header;