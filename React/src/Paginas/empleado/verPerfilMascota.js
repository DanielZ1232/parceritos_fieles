import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarEmpleado from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import Imagen from '../../assets/Imagenes/perro2perfil.jpeg';

const VerPerfilMascota = () => {
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
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.body}>
      <NavBarEmpleado />
      <div style={styles.container}>
        <center>
          <div style={styles.userImg}>
            <h1 style={styles.title}>Perfil de la Mascota</h1>
            <img src={Imagen} alt="img" style={styles.img} />
          </div>
        </center>
        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Nombre:</span>
              <span>{mascota.Nombre}</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Edad:</span>
              <span>{mascota.Edad} años</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Peso:</span>
              <span>{mascota.Peso} Kg</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Raza:</span>
              <span>{mascota.Raza}</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Enfermedades:</span>
              <span>{mascota.Enfermedades}</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <i className="fa-solid fa-paw" style={styles.icon} />
            <div style={styles.infoText}>
              <span style={styles.infoLabel}>Esterilizado:</span>
              <span>{mascota.Esterilizado}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'sans-serif',
    backgroundImage: 'url("../../assets/Imagenes/fondohuellas.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  },
  container: {
    maxWidth: '60%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffffd9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  userImg: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    color: 'black',
  },
  img: {
    width: '26%',
    height: 'auto',
    borderRadius: '8px',
    border: '4px solid #000',
  },
  infoSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas
    gap: '15px',
    justifyContent: 'center',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  },
  icon: {
    marginRight: '15px',
    fontSize: '24px',
    color: '#333',
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    flex: 1,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default VerPerfilMascota;
