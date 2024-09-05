import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarEmpleado from '../../components/navBarGerente';
import Footer from '../../components/footer';
import Imagen from '../../assets/Imagenes/perro2perfil.jpeg';
import './VerPerfilMascotaG.css';

const VerPerfilMascotaG = () => {
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    const fetchMascota = async () => {
      const id = localStorage.getItem('mascotaId');
      if (!id) {
        console.error('No se encontró el ID de la mascota en el localStorage');
        return;
      }

      try {
        const respuesta = await axios.get(`http://localhost:3002/Mascotas/${id}`);
        setMascota(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la mascota:', error);
      }
    };

    fetchMascota();
  }, []);

  if (!mascota) {
    return <div className="verPerfilMascotaG-loading">Cargando...</div>;
  }

  return (
    <div className="verPerfilMascotaG-body">
      <NavBarEmpleado />
      <div className="verPerfilMascotaG-container">
        <center>
          <div className="verPerfilMascotaG-userImg">
            <h1>Perfil de la Mascota</h1>
            <img src={Imagen} alt="img" className="verPerfilMascotaG-img" />
          </div>
        </center>
        <div className="verPerfilMascotaG-infoSection">
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Nombre:</span>
              <span>{mascota.Nombre}</span>
            </div>
          </div>
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Edad:</span>
              <span>{mascota.Edad} años</span>
            </div>
          </div>
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Peso:</span>
              <span>{mascota.Peso} Kg</span>
            </div>
          </div>
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Raza:</span>
              <span>{mascota.Raza}</span>
            </div>
          </div>
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Enfermedades:</span>
              <span>{mascota.Enfermedades}</span>
            </div>
          </div>
          <div className="verPerfilMascotaG-infoItem">
            <i className="fa-solid fa-paw verPerfilMascotaG-icon" />
            <div className="verPerfilMascotaG-infoText">
              <span className="verPerfilMascotaG-infoLabel">Esterilizado:</span>
              <span>{mascota.Esterilizado}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerPerfilMascotaG;
