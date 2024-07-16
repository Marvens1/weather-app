import React from 'react';
import Logo1 from './Logo1.png'

const NavigationMenu = () => {
  return (
    <nav className="navigation-menu">
      <div className="logo">
        <img src={Logo1} alt="Logo" />
      </div>
      <ul className="nav-links">
      
        <li><a href="#about">About</a></li>
        
      </ul>
    </nav>
  );
};

export default NavigationMenu;
