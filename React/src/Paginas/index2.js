import React, { useEffect, useState, useRef} from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Imagen from '../assets/Imagenes/perro1.jpeg';
import loadFonts from '../assets/loadfont';
import './index2.css';
import Imagen1 from '../assets/Imagenes/imagen1.jpeg';
import Imagen2 from '../assets/Imagenes/imagen2.jpg';
import Imagen3 from '../assets/Imagenes/imagen3.jpg';
import Imagen4 from '../assets/Imagenes/imagen4.jpg';
import Imagen5 from '../assets/Imagenes/imagen5.jpg';
import Imagen6 from '../assets/Imagenes/imagen6.jpg';
import ImagenHotel from '../assets/Imagenes/hotel.jpg';
import ImagenGuarderia from '../assets/Imagenes/guarderia1.webp';
import ImagenColegio from '../assets/Imagenes/colegio1.webp';
import Footer from '../components/footer';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado
import axios from 'axios';
import ImagenSede from '../assets/Imagenes/perroguia.png';



const Index2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [registerNombre, setRegisterNombre] = useState('');
    const [registerApellido, setRegisterApellido] = useState('');
    const [registerCorreo, setRegisterCorreo] = useState('');
    const [registerCelular, setRegisterCelular] = useState('');
    const [registerDireccion, setRegisterDireccion] = useState('');
    const [registerTipoDocumento, setRegisterTipoDocumento] = useState('');
    const [registerNumeroDocumento, setRegisterNumeroDocumento] = useState('');
    const [registerContraseña, setRegisterContraseña] = useState('');
    const [registerConfirmarContraseña, setRegisterConfirmarContraseña] = useState('');

    const images = [Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6];
    const navigate = useNavigate();


    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const getTransformValue = () => {
        return `translateX(-${(currentIndex * 100) / images.length}%)`;
    };
    const handleRegisterClick = (e) => {
      e.preventDefault();
      setLoginModalVisible(false);
      setRegisterModalVisible(true);
  };

    useEffect(() => {
        loadFonts();
        const interval = setInterval(goToNextSlide, 3000);
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

   
   
    const manejarInicioSesion = async (e) => {
      e.preventDefault();

      try {
          const respuesta = await axios.get('http://localhost:3002/Usuarios');
          const usuarios = respuesta.data;

          const usuario = usuarios.find(
              user => user.Correo === correo && user.Contraseña === contraseña
          );

          if (usuario) {
              Swal.fire({
                  title: 'Inicio de sesión exitoso',
                  text: 'Bienvenido de nuevo!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar'
              }).then(() => {
                  localStorage.setItem('usuarioId', usuario.id);

                  switch (usuario.Rol) {
                      case 'Cliente':
                          navigate('/menu');
                          break;
                      case 'Empleado':
                          navigate('/menuEmpleado');
                          break;
                      case 'Gerente':
                          navigate('/menuGerente');
                          break;
                      default:
                          Swal.fire({
                              title: 'Error',
                              text: 'Rol desconocido',
                              icon: 'error',
                              confirmButtonColor: '#3085d6',
                              confirmButtonText: 'Aceptar'
                          });
                          break;
                  }

                  setLoginModalVisible(false);
              });
          } else {
              Swal.fire({
                  title: 'Error',
                  text: 'Correo o contraseña incorrectos',
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar'
              });
          }
      } catch (error) {
          console.error('Error al iniciar sesión:', error);
          Swal.fire({
              title: 'Error',
              text: 'Error al iniciar sesión',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
          });
      }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerContraseña !== registerConfirmarContraseña) {
        Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    
    if (!validatePassword(registerContraseña)) {
      Swal.fire({
          title: 'Error',
          text: 'La contraseña debe contener al menos una letra mayúscula, un número y un signo especial',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  try {
      const response = await axios.get('http://localhost:3002/Usuarios');
      const usuarios = response.data;
      const usuarioExistente = usuarios.find(usuario => usuario.Correo === registerCorreo);
      if (usuarioExistente) {
          Swal.fire({
              title: 'Error',
              text: 'Ya existe un usuario con este correo',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      const nuevoUsuario = {
          id: Date.now().toString(),
          Nombre: registerNombre,
          Apellido: registerApellido,
          Correo: registerCorreo,
          Celular: registerCelular,
          Direccion: registerDireccion,
          TipoDocumento: registerTipoDocumento,
          NumeroDocumento: registerNumeroDocumento,
          Contraseña: registerContraseña,
          Rol: 'Cliente',
      };

      await axios.post('http://localhost:3002/Usuarios', nuevoUsuario);

      Swal.fire({
          title: 'Registrado con éxito',
          text: 'Usuario registrado con éxito',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
      }).then(() => {
          setRegisterModalVisible(false);
      });
  } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire({
          title: 'Error',
          text: 'Error al registrar usuario',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
      });
  }
};

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasSpecialChar && hasNumber;
};

const handleAccountClick = () => {
  if (!isLoggedIn) {
      Swal.fire({
          title: "¿No tienes cuenta?",
          text: "Regístrate o inicia sesión",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Iniciar sesión",
          cancelButtonText: "Regístrate"
      }).then((result) => {
          if (result.isConfirmed) {
              setLoginModalVisible(true);
          } else {
              setRegisterModalVisible(true);
          }
      });
  } else {
      Swal.fire({
          title: 'Ya estás logueado',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
      });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const loginModalRef = useRef(null); // Define el ref para el modal


    return (
        <div>
            <section>
                <div style={bannerStyles.container}>
                    <img src={Imagen} alt="Beautiful destination" style={bannerStyles.image} />
                    <div style={bannerStyles.overlay}>
                        <h1 className='titulo' style={bannerStyles.title}>Parceritos Fieles</h1>
                        <h2 className='Subtitulo' style={bannerStyles.subtitle}>Hotel, Guardería y Colegio Canino</h2>
                        <a
                            href={{ pathname: "https://wa.me/+573506842198" }} 
                            target="_blank"
                            rel="noopener noreferrer"
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
                        <a href="#sede" style={bannerStyles.navLink}>Sede</a>
                        <a href="#" style={bannerStyles.navLink} onClick={handleAccountClick}>Cuenta</a>
                    </nav>
                </div>
            </section>

            <section id='servicios'>
    <div style={styles.serviciosSection}>
        <h2 style={styles.serviciosTitulo}>Nuestros servicios</h2>
        <div style={styles.serviciosContainer}>

            {/* Tarjeta 1: Hotel */}
            <div style={styles.servicioCard}>
                <img src={ImagenHotel} alt="Hotel" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Hotel</h3>
                    <p>¿Necesitas viajar y no tienes quién cuide tu mascota?</p>
                    <p>¡Trae sus pijamas! Porque en Dog Garden tenemos un lugar cálido y seguro para que tu peludo pase todas las noches que necesite.</p>
                    <p><strong>Precio: $40,000 por día y noche</strong></p>
                    <button style={styles.servicioBoton}>Ver precios</button>
                </div>
            </div>

            {/* Tarjeta 2: Guardería */}
            <div style={styles.servicioCard}>
                <img src={ImagenGuarderia} alt="Guardería" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Guardería</h3>
                    <p>¿Debes volver al trabajo y te preocupa dejar a tu mascota?</p>
                    <p>Puedes estar tranquilo en la oficina, mientras tu peludo pasa un día fenomenal con otros amigos perrunos en un ambiente divertido y seguro.</p>
                    <p><strong>Pasadía: $35,000 (hasta 2 días a la semana)</strong></p>
                    <button style={styles.servicioBoton}>Ver precios</button>
                    <p style={styles.servicioDuracion}>Horario: 6am - 8pm.</p>
                </div>
            </div>

            {/* Tarjeta 3: Colegio */}
            <div style={styles.servicioCard}>
                <img src={ImagenColegio} alt="Colegio" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Colegio</h3>
                    <p>¿Quieres que tu peludo aprenda y socialice?</p>
                    <p>¡En Dog Garden tenemos clases para todas las edades! Adicionalmente, ofrecemos actividades de socialización y juegos.</p>
                    <p><strong>Mensualidad:</strong></p>
                    <ul>
                        <li>Raza grande: <strong>$350,000</strong> ● Raza pequeña: <strong>$300,000</strong></li>
                    </ul>
                    <button style={styles.servicioBoton}>Ver precios</button>
                    <p style={styles.servicioDuracion}>Estadia mínima por 24 horas.</p>
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

            <section id='sede'>
    <div style={styles.sedeSection}>
        <h2 style={styles.sedeTitulo}>Nuestra Sede</h2>
        <div style={styles.sedeContainer}>
            <div style={styles.imageContainer}>
                <img src={ImagenSede} alt="Sede" style={styles.sedeImagen} />
                <div style={styles.textOverlay}>
                    <p style={styles.overlayText}>Esta es nuestra única sede, ¡ven a visitarnos!</p>
                </div>
            </div>
            <div style={styles.mapContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096153!2d144.95373531531656!3d-37.816279979751824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0c1f20a7%3A0x5045675218ceed0!2sYour%20Location!5e0!3m2!1sen!2sus!4v1611184548000!5m2!1sen!2sus"
                    style={styles.map}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </div>
</section>



            <Footer
            onLoginClick={() => setLoginModalVisible(true)} 
            onRegisterClick={() => setRegisterModalVisible(true)} 
            /> 


            {/* Botón para volver arriba */}
            <button 
                onClick={scrollToTop} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ff7f50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    fontSize: '16px',
                }}
            >
                ▲
            </button>


           {/* Modal de inicio de sesión */}
{loginModalVisible && (
    <div className="modal-overlay" onClick={() => setLoginModalVisible(false)}>
        <div
            className="modal-content login-modal"
            onClick={(e) => e.stopPropagation()} // Previene que el clic dentro del modal cierre el modal
            ref={loginModalRef} // Ref para el modal
        >
            <form id="loginForm" onSubmit={manejarInicioSesion}>
                <h1 className="form-title">Iniciar Sesión</h1>
                <div className="form-group">
                    <label htmlFor="correo">Correo</label>
                    <input
                        type="email"
                        id="correo"
                        placeholder="Tu correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        placeholder="Tu contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">Iniciar Sesión</button>
                <button type="button" onClick={() => setLoginModalVisible(false)} className="close-modal">Cerrar</button>
                <div className="form-links">
                    <a href="#">¿Olvidaste tu Contraseña?</a>
                    <a href="#" onClick={handleRegisterClick}>¿No tienes cuenta? Regístrate!</a>
                </div>
            </form>
        </div>
    </div>
)}

            {/* Modal de registro */}
            {registerModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content register-modal">
                        <form id="registerForm" onSubmit={handleRegisterSubmit}>
                            <h1 className="form-title">Registrarse</h1>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Tu nombre"
                                    value={registerNombre}
                                    onChange={(e) => setRegisterNombre(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    placeholder="Tu apellido"
                                    value={registerApellido}
                                    onChange={(e) => setRegisterApellido(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo_registro">Correo</label>
                                <input
                                    type="email"
                                    id="correo_registro"
                                    placeholder="Tu correo"
                                    value={registerCorreo}
                                    onChange={(e) => setRegisterCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="celular">Celular</label>
                                <input
                                    type="text"
                                    id="celular"
                                    placeholder="Tu celular"
                                    value={registerCelular}
                                    onChange={(e) => setRegisterCelular(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    placeholder="Tu dirección"
                                    value={registerDireccion}
                                    onChange={(e) => setRegisterDireccion(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipo_documento">Tipo de Documento</label>
                                <select
                                    id="tipo_documento"
                                    value={registerTipoDocumento}
                                    onChange={(e) => setRegisterTipoDocumento(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un tipo de documento</option>
                                    <option value="CC">C.C</option>
                                    <option value="PPT">PPT</option>
                                    <option value="CE">C.E</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="numero_documento">Número de Documento</label>
                                <input
                                    type="text"
                                    id="numero_documento"
                                    placeholder="Tu número de documento"
                                    value={registerNumeroDocumento}
                                    onChange={(e) => setRegisterNumeroDocumento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Tu contraseña"
                                    value={registerContraseña}
                                    onChange={(e) => setRegisterContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm_password">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    placeholder="Confirma tu contraseña"
                                    value={registerConfirmarContraseña}
                                    onChange={(e) => setRegisterConfirmarContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="button">Registrarse</button>
                            <button type="button" onClick={() => setRegisterModalVisible(false)} className="close-modal">Cerrar</button>
                        </form>
                    </div>
                </div>
            )}
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
        width: '80%',
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
    sedeSection: {
      backgroundColor: '#f9f9f9',
      padding: '50px 20px',
      textAlign: 'center',
  },
  sedeTitulo: {
      fontSize: '2.5rem',
      marginBottom: '40px',
      color: '#333',
  },
  sedeContainer: {
      display: 'flex',
      justifyContent: 'center', // Cambiado para acercar los elementos
      flexWrap: 'wrap',
      alignitems: 'stretch',
      flexdirection: 'unset',
  },
  imageContainer: {
      position: 'relative',
      width: '45%', // Mantén el ancho
      marginRight: '10px', // Ajustado para acercar más
  },
  sedeImagen: {
      width: '70%', // Cambiado a 100% para ocupar todo el contenedor
      height: '400px',
      borderRadius: '10px',
      objectFit: 'cover',
  },
  textOverlay: {
      position: 'absolute',
      top: '85%', // Ajusta según sea necesario
      left: '23%', // Ajusta según sea necesario
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      opacity: 0,
      animation: 'fadeIn 2s forwards',
      transition: 'opacity 0.5s ease-in-out',
      zIndex: 1,
  },
  overlayText: {
      margin: 0,
      fontSize: '1.2rem', // Ajusta el tamaño del texto
  },
  mapContainer: {
      width: '45%', // Mantén el ancho
      height: '400px', // Ajusta la altura del mapa
      borderRadius: '10px',
      overflow: 'hidden',
  },
  map: {
      width: '100%',
      height: '100%',
  },
};

export default Index2;
