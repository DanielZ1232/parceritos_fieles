import React, { useEffect, useState } from 'react';
import NavBarCliente from '../../components/navBarCliente'; // Ajusta la ruta según tu estructura de carpetas
import Footer from '../../components/footer'; // Ajusta la ruta según tu estructura de carpetas
import './consultarQuejasC.css'; // Asegúrate de que la ruta es correcta y el nombre del archivo CSS coincide

const ConsultarQuejasC = () => {
    const [quejas, setQuejas] = useState([]);
    const [usuarios, setUsuarios] = useState({});

    // Función para obtener las quejas desde el backend
    const fetchQuejas = async () => {
        try {
            const response = await fetch('http://localhost:3002/Quejas'); // Ajusta la URL según la configuración de tu API
            const data = await response.json();
            setQuejas(data);

            // Obtén los usuarios
            const usuariosResponse = await fetch('http://localhost:3002/Usuarios');
            const usuariosData = await usuariosResponse.json();
            const usuariosMap = usuariosData.reduce((acc, usuario) => {
                acc[usuario.id] = usuario;
                return acc;
            }, {});
            setUsuarios(usuariosMap);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Llama a la función para obtener las quejas cuando el componente se monte
    useEffect(() => {
        fetchQuejas();
    }, []);

    // Función para alternar la visibilidad del contenido de la queja
    const toggleQueja = (button) => {
        const row = button.closest('tr').nextElementSibling;
        if (row.style.display === 'none') {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    };

    return (
        <div className="page-wrapper">
            <NavBarCliente />
            <div className="container">
                <div className="content">
                    <h2>Quejas</h2>
                    <p>Estas son las últimas quejas registradas en el sistema</p>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Celular</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quejas.map((queja, index) => {
                                    const usuario = usuarios[queja.usuarioId] || {};
                                    return (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>{queja.fecha || 'Desconocida'}</td>
                                                <td>{queja.hora || 'Desconocida'}</td>
                                                <td>{usuario.Nombre || 'Desconocido'}</td>
                                                <td>{usuario.Correo || 'Desconocido'}</td>
                                                <td>{usuario.Celular || 'Desconocido'}</td>
                                                <td>
                                                    <button className="ver-btn" onClick={(e) => toggleQueja(e.target)}>Ver</button>
                                                </td>
                                            </tr>
                                            <tr className="queja-row" style={{ display: 'none' }}>
                                                <td colSpan="6">
                                                    <div className="queja-content">
                                                        <p>{queja.texto || 'No hay detalle de la queja.'}</p>
                                                        <button className="actualizar-btn" onClick={() => window.location.href = 'actualizarQueja.html'}>Actualizar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer className="footer-sticky" />
             {/* Botón flotante de WhatsApp */}
             <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default ConsultarQuejasC;
