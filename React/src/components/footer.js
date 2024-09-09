import React, { useState, useEffect } from 'react';
import './footer.css'; // Importa los estilos específicos para el Footer

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Actualiza el año cada vez que el componente se monta
        setCurrentYear(new Date().getFullYear());
    }, []);

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
              
            </div>
            <div className="footer-bottom">
                &copy; {currentYear} Parceritos Fieles
            </div>
        </footer>
    );
};

export default Footer;
