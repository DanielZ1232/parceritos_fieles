import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente'; // Ajusta la ruta según tu estructura de carpetas
import Footer from '../../components/footer'; // Ajusta la ruta según tu estructura de carpetas
import './consultarQuejasC.css'; // Asegúrate de que la ruta es correcta y el nombre del archivo CSS coincide
import Swal from 'sweetalert2'; // Importa SweetAlert2

const ConsultarQuejasC = () => {
    const [quejas, setQuejas] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [quejaSeleccionada, setQuejaSeleccionada] = useState(null);
    const userId = localStorage.getItem('usuarioId'); // Obtén el ID del usuario desde el localStorage

    // Función para obtener las quejas desde el backend
    const fetchQuejas = async () => {
        try {
            const response = await fetch('http://localhost:3002/Quejas'); // Ajusta la URL según la configuración de tu API
            const data = await response.json();

            // Filtra las quejas del usuario actual
            const filteredQuejas = data.filter(queja => queja.usuarioId === userId);
            setQuejas(filteredQuejas);

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
    const toggleQueja = (event) => {
        const row = event.currentTarget.closest('tr').nextElementSibling;
        if (row.style.display === 'none') {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    };

    // Función para mostrar el modal con la queja seleccionada
    const showUpdateModal = (queja) => {
        setQuejaSeleccionada(queja);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
        setQuejaSeleccionada(null);
    };

    // Función para actualizar la queja
    const actualizarQueja = async (event) => {
        event.preventDefault();

        try {
            // Actualiza la queja en la base de datos a través de una solicitud PUT
            await fetch(`http://localhost:3002/Quejas/${quejaSeleccionada.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...quejaSeleccionada,
                    texto: quejaSeleccionada.texto, // Asegúrate de enviar todos los campos necesarios
                }),
            });

            // Muestra la alerta de éxito
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La queja ha sido actualizada con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            // Actualiza la lista de quejas y cierra el modal
            fetchQuejas();
            closeModal();
        } catch (error) {
            console.error('Error al actualizar la queja:', error);
        }
    };

    return (
        <div className="page-wrapper">
            <NavBarCliente />
            <div className="container">
                <div className="content">
                    <h2>Quejas</h2>
                    <p>Estas son las quejas registradas por usted en el sistema</p>
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
                                                    <i 
                                                        className="fas fa-eye" 
                                                        onClick={toggleQueja}
                                                        style={{ cursor: 'pointer' }}
                                                    ></i>
                                                </td>
                                            </tr>
                                            <tr className="queja-row" style={{ display: 'none' }}>
                                                <td colSpan="6">
                                                    <div className="queja-content">
                                                        <p>{queja.texto || 'No hay detalle de la queja.'}</p>
                                                        <button className="actualizar-btn" onClick={() => showUpdateModal(queja)}>Actualizar</button>
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

            {/* Modal de actualización */}
            {modalVisible && quejaSeleccionada && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        
                        <form className="actualizar-form" onSubmit={actualizarQueja}>
                        <h2>Actualizar Queja</h2>
                            <textarea 
                                id="queja" 
                                name="queja" 
                                rows="4" 
                                cols="50"
                                value={quejaSeleccionada.texto}
                                onChange={(e) => setQuejaSeleccionada({ ...quejaSeleccionada, texto: e.target.value })}
                            />
                            <br />
                            <button type="submit" className="guardar-btn">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultarQuejasC;
