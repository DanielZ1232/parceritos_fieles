import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBarCliente from '../../components/navBarCliente'; // Asegúrate de que la ruta es correcta
import Footer from '../../components/footer'; // Asegúrate de que la ruta es correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './PerfilMascota.css'; // Asegúrate de que esta ruta es correcta

// Importa la imagen
import PerroImg from '../../assets/Imagenes/perro2.jpeg'; // Ajusta la ruta si es necesario

const PerfilMascota = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await fetch(`http://localhost:3002/Mascotas/${id}`); // URL del endpoint
        if (response.ok) {
          const data = await response.json();
          setMascota(data);
        } else {
          console.error('Error al obtener la mascota:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchMascota();
  }, [id]);

  return (
    <div className="page-container">
      <NavBarCliente />
      <div className="container-2">
        {mascota ? (
          <>
            <h1>Perfil de la Mascota</h1>
            <center>
              <div className="user-img">
                <img src={PerroImg} alt="Perfil de la mascota" /> {/* Usa la imagen importada */}
              </div>
            </center>
            <div className="info-section">
              <div className="info-ite">
                <div className="info-item">
                  <i className="fa-solid fa-paw" />
                  <span>Nombre<br />{mascota.nombre}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-paw" />
                  <span>Edad<br />{mascota.edad} años</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-paw" />
                  <span>Peso<br />{mascota.peso} Kg</span>
                </div>
              </div>
              <div className="info-ite2">
                <div className="info-item">
                  <i className="fa-solid fa-paw" />
                  <span>Raza<br />{mascota.raza}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-paw" />
                  <span>Enfermedades<br />{mascota.enfermedades}</span>
                </div>
                <div className="info-item-direc">
                  <i className="fa-solid fa-paw" />
                  <span>Esterilizado<br />{mascota.esterilizado === 'si' ? 'Sí' : 'No'}</span>
                </div>
              </div>
            </div>
            <div className="boton">
              <center>
                <a href="ActualizarDatos.html" className="button">Eliminar</a>
              </center>
            </div>
          </>
        ) : (
          <p>Cargando perfil de la mascota...</p>
        )}
      </div>
      <Footer />
      {/* Círculo flotante con WhatsApp */}
      <a 
        href="https://wa.me/3103409688" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </div>
  );
};

export default PerfilMascota;
