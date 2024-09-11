import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente'; // Ajusta la ruta según tu estructura de carpetas
import Footer from '../../components/footer'; // Ajusta la ruta según tu estructura de carpetas
import './crearQuejaC.css';
import Logo from '../../assets/Imagenes/logo.png'; // Asegúrate de que la ruta es correcta
import Swal from 'sweetalert2';
import axios from 'axios'; // Usaremos axios para las llamadas a la API

const CrearQuejaC = () => {
    const maxLength = 250; // Número máximo de caracteres permitidos
    const [text, setText] = useState(''); // Estado para almacenar el texto del textarea
    const [isSaving, setIsSaving] = useState(false); // Estado para manejar el estado de guardado
    const [usuarioData, setUsuarioData] = useState({ nombre: '', correo: '' }); // Almacena los datos del usuario

    const userId = localStorage.getItem('usuarioId'); // Obtén el ID del usuario desde el localStorage

    // Cargar los datos del usuario basado en el userId
    useEffect(() => {
        const fetchUsuarioData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/Usuarios/${userId}`); // Ajusta la URL según tu API
                if (response.data) {
                    setUsuarioData({
                        nombre: response.data.Nombre,
                        correo: response.data.Correo
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario no encontrado',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener los datos del usuario.',
                    confirmButtonText: 'Aceptar'
                });
            }
        };

        if (userId) {
            fetchUsuarioData();
        }
    }, [userId]);

    // Manejador para actualizar el texto y el contador de caracteres
    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Manejador para guardar la queja
    const handleSave = async () => {
        if (!text.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor, escriba su queja antes de guardar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        setIsSaving(true);
        try {
            const now = new Date();
            const fecha = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const hora = now.toTimeString().split(' ')[0]; // Formato HH:MM:SS

            // Realiza la solicitud POST para guardar la queja junto con el nombre y correo del usuario
            const response = await fetch('http://localhost:3002/Quejas', { // Ajusta la URL según la configuración de tu API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    texto: text,
                    usuarioId: userId, // Incluye el ID del usuario
                    nombre: usuarioData.nombre, // Incluye el nombre del usuario
                    correo: usuarioData.correo, // Incluye el correo del usuario
                    fecha: fecha, // Incluye la fecha
                    hora: hora,
                    Respuesta: "",
                    RespuestaG: ""
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Queja guardada con éxito.',
                    timer: 1500,
                    showConfirmButton: false
                });
                setText(''); // Limpia el textarea
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la queja.',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al guardar la queja:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar la queja.',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="crear-queja-container">
            <NavBarCliente />
            <div className="form-wrapper">
                <div className="form-container">
                    <img id="logo" src={Logo} alt="Parceritos Fieles" />
                    <h1 className="form-title">Crear Queja</h1>
                    <div className="textarea-wrapper">
                        <textarea 
                            placeholder="Escriba su queja" 
                            maxLength={maxLength} 
                            value={text}
                            onChange={handleChange}
                        />
                        <div className="char-count">
                            {maxLength - text.length} caracteres restantes
                        </div>
                    </div>
                    <button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
            <Footer className="footer" />
            {/* Botón flotante de WhatsApp */}
            <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default CrearQuejaC;
