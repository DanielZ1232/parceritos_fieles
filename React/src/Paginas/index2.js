import React, { useEffect, useState } from 'react'; // Importa useEffect y useState
import { Link } from 'react-router-dom';
import Imagen from '../assets/Imagenes/perro1.jpeg';
import loadFonts from '../assets/loadfont'; // Asegúrate de que esto sea correcto
import './index2.css';
import Imagen1 from '../assets/Imagenes/imagen1.jpeg';
import Imagen2 from '../assets/Imagenes/imagen2.jpeg';
import Imagen3 from '../assets/Imagenes/imagen3.jpeg';
import Imagen4 from '../assets/Imagenes/imagen4.jpeg';
import Imagen5 from '../assets/Imagenes/imagen5.jpeg';
import Imagen6 from '../assets/Imagenes/imagen6.jpeg';
import ImagenHotel from '../assets/Imagenes/hotel.jpg'; // Cambia las rutas según tus imágenes
import ImagenGuarderia from '../assets/Imagenes/guarderia.jpeg';
import ImagenColegio from '../assets/Imagenes/colegio.jpeg';


const Index2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice de la imagen actual
    const images = [Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6]; // Array de imágenes

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
      
      const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
      const getTransformValue = () => {
        return `translateX(-${(currentIndex * 100) / images.length}%)`; // Transforma basado en el índice y el número total de imágenes
    };
    useEffect(() => {
      loadFonts();
  
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Vuelve a la primera imagen después de la última
      }, 3000); // Cambia de imagen cada 3 segundos
  
      return () => clearInterval(interval);
  }, [images.length]);
  const bannerStyles = {
    container: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: '50px',
    },
    title: {
      color: 'white',
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      fontFamily: 'Poppins-SemiBold',
      letterSpacing: '4px',
    },
    subtitle: {
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'normal',
      marginTop: '-4px',
      marginBottom: '30px',
      fontFamily: 'Poppins-ExtraLightItalic',
      letterSpacing: '2px',
    },
    nav: {
      position: 'absolute',
      top: '20px',
      right: '20px',
    },
    navLink: {
      color: 'white',
      marginLeft: '20px',
      textDecoration: 'none',
      fontSize: '1.1rem',
      letterSpacing: '1px',
      fontFamily: "'Poppins-Regular', sans-serif",
    },
  };


  return (
    <div>
      <section>
        <div style={bannerStyles.container}>
          <img src={Imagen} alt="Beautiful destination" style={bannerStyles.image} />
          <div style={bannerStyles.overlay}>
            <h1 className='titulo' style={bannerStyles.title}>Parceritos Fieles</h1>
            <h2 className='Subtitulo' style={bannerStyles.subtitle}>Hotel, Guardería y Colegio Canino</h2>
            <a
              href={{ pathname: "https://wa.me/+573506842198" }} // Cambia el número por el tuyo
              target="_blank"
              rel="noopener noreferrer"  // Esto abre el enlace en una nueva pestaña
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E1E9C8',
                borderRadius: '20px',
                padding: '10px 20px',
                textDecoration: 'none',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                marginTop: '20px',
                fontFamily: 'Poppins-ExtraLightItalic',
                letterSpacing: '2px'
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '30px', marginRight: '10px' }}></i>

              Contáctanos
            </a>
          </div>

          {/* Navigation */}
          <nav style={bannerStyles.nav}>
            <a href="#" style={bannerStyles.navLink}>Inicio</a>
            <a href="#servicios" style={bannerStyles.navLink}>Servicios</a>
            <a href="#" style={bannerStyles.navLink}>Sede</a>
            <a href="#" style={bannerStyles.navLink}>Mi Cuenta</a>
          </nav>
        </div>
      </section>

      <section id='servicios'>
      <div style={styles.serviciosSection}>
      <h2 style={styles.serviciosTitulo}>Nuestros servicios</h2>
      <div style={styles.serviciosContainer}>

        {/* Tarjeta 1: Co-Barking */}
        <div style={styles.servicioCard}>
          <img src={ImagenHotel} alt="Hotel" style={styles.servicioImagen} />
          <div style={styles.servicioInfo}>
            <h3 style={styles.servicioTitulo}>Hotel</h3>
            <p>¿Necesitas viajar y no tienes quién cuide tu mascota?</p>
            <p>¡Trae sus pijamas! Porque en Dog Garden tenemos un lugar cálido y seguro para que tu peludo pase todas las noches que necesite.</p>
            <button style={styles.servicioBoton}>Ver precios</button>
            <p style={styles.servicioDuracion}>Estadia mínima 3 horas.</p>
          </div>
        </div>

        {/* Tarjeta 2: Dog Office */}
        <div style={styles.servicioCard}>
          <img src={ImagenGuarderia} alt="Guarderia" style={styles.servicioImagen} />
          <div style={styles.servicioInfo}>
            <h3 style={styles.servicioTitulo}>Guarderia</h3>
            <p>¿Debes volver al trabajo y te preocupa dejar a tu mascota?</p>
            <p>Puedes estar tranquilo en la oficina, mientras tu peludo pasa un día fenomenal con otros amigos perrunos en un ambiente divertido y seguro.</p>
            <button style={styles.servicioBoton}>Ver precios</button>
            <p style={styles.servicioDuracion}>Horario: 6am - 8pm.</p>
          </div>
        </div>

        {/* Tarjeta 3: Dog Hotel */}
        <div style={styles.servicioCard}>
          <img src={ImagenColegio} alt="Colegio" style={styles.servicioImagen} />
          <div style={styles.servicioInfo}>
            <h3 style={styles.servicioTitulo}>Colegio</h3>
            <p>¿Necesitas viajar y no tienes quién cuide tu mascota?</p>
            <p>¡Trae sus pijamas! Porque en Dog Garden tenemos un lugar cálido y seguro para que tu peludo pase todas las noches que necesite.</p>
            <button style={styles.servicioBoton}>Ver precios</button>
            <p style={styles.servicioDuracion}>Estadia por 24 horas.</p>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* Carrusel estático */}
    <section className="about">
    <div className="slider-container">
                <button className="slider-button left" onClick={goToPrevSlide}>
                    {'<'}
                </button>
                <div className="slider-wrapper" style={{ transform: getTransformValue() }}>
                    {images.map((image, index) => (
                        <div className="slider-item" key={index}>
                            <img src={image} alt={`Imagen ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="slider-button right" onClick={goToNextSlide}>
                    {'>'}
                </button>
            </div>
    </section>
    </div>
  );
};

const styles = {
    serviciosSection: {
      backgroundColor: 'white',
      padding: '50px 20px',
      textAlign: 'center',
    },
    serviciosTitulo: {
      fontSize: '2.5rem',
      marginBottom: '40px',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
    serviciosContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    servicioCard: {
      backgroundColor: '#fdf6e4',
      width: '30%',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    servicioImagen: {
      width: '95%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '10px 10px 0 0',
    },
    servicioInfo: {
      textAlign: 'left',
      padding: '10px 0',
    },
    servicioTitulo: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#333',
    },
    servicioBoton: {
      display: 'block',
      backgroundColor: '#ff7f50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      textAlign: 'center',
      marginTop: '10px',
      cursor: 'pointer',
    },
    servicioDuracion: {
      fontSize: '0.9rem',
      marginTop: '10px',
      color: '#888',
    },
  };

export default Index2;
