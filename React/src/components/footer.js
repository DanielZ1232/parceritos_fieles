import React from 'react';
import './footer.css'; // Importa los estilos específicos para el Footer

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contáctanos</h3>
                    <p>Correo: contact@parceritosfieles.com</p>
                    <p>Celular: 3103409688</p>
                </div>
                <div className="footer-section">
                    <h3>Nosotros</h3>
                    <p>Parceritos Fieles se especializa en el cuidado y bienestar de tu mascota con servicios como guardería, colegio y hotel.</p>
                </div>
                <div className="footer-section">
                    <h3>Síguenos</h3>
                    <ul className="social-media">
                        <li><a href="https://www.instagram.com/guarderia_parceritos_fieles?igsh=eXBxaTIxbGg2NXpi" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="https://www.facebook.com/profile.php?id=61555383941250" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>
                        <li><a href="https://www.tiktok.com/@parceritosfieles?_t=8oLcvrq6wh3&_r=1" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Parceritos Fieles
            </div>
        </footer>
    );
};

export default Footer;
