import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Imagenes/logo.png';
import './navbarGerente.css';
import { Link } from 'react-router-dom';

const NavBarGerente = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };
 
  return (
    <div className="navBarGerente-container">
      <header className="navBarGerente-header">
        <div className="navBarGerente-logo">
          <Link to="/menuGerente">
            <img src={Logo} alt="Logo Parceritos Fieles" className="navBarGerente-logoImg" />
          </Link>
        </div>
        <div className="navBarGerente-nav">
          <div className="navBarGerente-navItem">
            <Link to="/menuGerente" className="navBarGerente-link">Inicio</Link>
          </div>
          <div className="navBarGerente-dropdown">
            <Link to="#" className="navBarGerente-link">Mascotas</Link>
            <div className="navBarGerente-dropdownContent">
              <Link to="/consultarMascotaG" className="navBarGerente-dropdownContentLink">Consultar</Link>
            </div>
          </div>
          <div className="navBarGerente-dropdown">
            <Link to="#" className="navBarGerente-link">Reservas</Link>
            <div className="navBarGerente-dropdownContent">
              <Link to="/consultarReservasG" className="navBarGerente-dropdownContentLink">Consultar</Link>
            </div>
          </div>
          <div className="navBarGerente-dropdown">
            <Link to="#" className="navBarGerente-link">Quejas</Link>
            <div className="navBarGerente-dropdownContent">
              <Link to="/consultarQuejasG" className="navBarGerente-dropdownContentLink">Consultar</Link>
            </div>
          </div>
          <div className="navBarGerente-dropdown">
            <Link to="#" className="navBarGerente-link">Cuenta</Link>
            <div className="navBarGerente-dropdownContent">
              <Link to="/miPerfilG" className="navBarGerente-dropdownContentLink">Mi Perfil</Link>
              <Link to="#" onClick={handleLogout} className="navBarGerente-dropdownContentLink">Cerrar sesión</Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBarGerente;
