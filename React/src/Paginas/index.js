import React from "react";
import NavIndex from "../components/navIndex";
import Footer from "../components/footer";
import './index.css';
import { Link } from 'react-router-dom';
import Perro from '../assets/Imagenes/imagen_perro.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import guarderiaImage from '../assets/Imagenes/guarderia.png';
import colegioImage from '../assets/Imagenes/colegio.png';
import hotelImage from '../assets/Imagenes/hotel.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS


// Configuración del Carrusel
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Añadido para el movimiento automático
    autoplaySpeed: 900,  // Tiempo en milisegundos entre cambios de slide
};

function Index() {
    return (
        <div>
            <NavIndex />
            <section className="hero">
                <div className="hero-text-container">
                    <font size={8}>¡Sé Parte de Nosotros!</font>
                    <br />
                    <br />
                    <br />
                    <font size={4}>Somos expertos en cuidado animal, ofreciendo un servicio de calidad</font>
                    <br />
                    <br />
                    <font size={4}>Inicia Sesión o Regístrate</font>
                    <br />
                    <br />
                    <font size={4}>Tu mascota también tiene derecho a tener un buen bienestar</font>
                    <br />
                    <br />
                    <Link to="/login" className="button">Entra Ahora</Link>
                    <br />
                    <br />
                    <h4>Nuestras Redes Sociales</h4>
                    <a href="https://www.instagram.com/guarderia_parceritos_fieles?igsh=eXBxaTIxbGg2NXpi">
                        <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61555383941250">
                        <i className="fa-brands fa-facebook-f" />
                    </a>
                    <a href="https://www.tiktok.com/@parceritosfieles?_t=8oLcvrq6wh3&_r=1">
                        <i className="fa-brands fa-tiktok" />
                    </a>
                </div>
                <div className="hero-image-container">
                    <img src={Perro} alt="Imagen de perro" style={{ filter: 'brightness(0.8)' }} />
                </div>
            </section>
            <section className="about" id="nosotros">
                <div className="container">
                    <div className="about-content">
                        <h2>Nosotros</h2>
                        <p>Bienvenidos a Parceritos Fieles, tu mejor opción para el cuidado de tu perro. Nos especializamos en brindar un ambiente seguro y acogedor donde tu mascota puede disfrutar de nuestros servicios de guardería, colegio y hotel.</p>
                        <p>En Parceritos Fieles, entendemos lo importante que es para ti el bienestar de tu perro. Por eso, ofrecemos un servicio de transporte para recoger a tu perrito y llevarlo a nuestras instalaciones, asegurándonos de que tenga una experiencia cómoda y sin estrés desde el primer momento.</p>
                        <p>Proporcionamos atención personalizada y actividades enriquecedoras para mantener a tu perro feliz, saludable y bien educado. Ya sea que necesites un lugar confiable para dejar a tu perro durante el día, una educación efectiva y divertida, o un hospedaje cómodo mientras estás fuera, Parceritos Fieles está aquí para ayudarte.</p>
                        <p>Confía en nosotros para cuidar a tu mejor amigo con el amor y la dedicación que se merece. ¡En Parceritos Fieles, tu perro es nuestra prioridad!</p>
                    </div>
                </div>
            </section>
            <section className="services" id="servicio">
                <div className="container">
                    <h2>Servicios</h2>
                </div>
                <div className="services-wrapper">
                    <Slider {...settings} className="services-slider">
                        <div className="service">
                            <img src={guarderiaImage} alt="Guardería" />
                            <h3>Guardería</h3>
                            <p>En nuestra guardería, tu perro pasa el día jugando y socializando. Lo cuidamos y nos aseguramos de que esté feliz y seguro. ¡Trae a tu perro y deja que se divierta!</p>
                        </div>
                        <div className="service">
                            <img src={colegioImage} alt="Colegio" />
                            <h3>Colegio</h3>
                            <p>En nuestro colegio, enseñamos a tu perro a comportarse mejor. Usamos métodos amables y efectivos para que tu perro aprenda de manera divertida. ¡Ven y mejora la conducta de tu mascota!</p>
                        </div>
                        <div className="service">
                            <img src={hotelImage} alt="Hotel" />
                            <h3>Hotel</h3>
                            <p>En nuestro hotel, tu perro se queda en un lugar cómodo y seguro mientras tú estás fuera. Le damos atención las 24 horas del día para que esté feliz y tranquilo. ¡Viaja con la tranquilidad de que tu perro está bien cuidado!</p>
                        </div>
                    </Slider>
                </div>
            </section>
            <section className="location" id="ubicacion">
                <div className="container">
                    <h2>Ubicación</h2>
                    <center>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7951.205551718149!2d-74.1458227!3d4.8380667!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwNTAnMjguNyJOIDc0wrAwOCc0Mi4yIlc!5e0!3m2!1ses!2sco!4v1721949617744!5m2!1ses!2sco" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </center>
                </div>
            </section>
            <section className="contact" id="contacto">
                <div className="container">
                    <h2>Contáctanos</h2>
                    <font size="3.5">Comuníquese con nosotros:</font>
                    <br />
                    <div className="card" style={{ width: 200 }} id="carta">
                        <div className="card-body">
                            <span>
                                <i className="fa-solid fa-phone">
                                    <a href="tel:3103409688">3103409688</a>
                                </i>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Círculo flotante con WhatsApp */}
            <a href="https://wa.me/573103409688" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>

            <Footer />
        </div>
    );
}

export default Index;
